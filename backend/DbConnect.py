import psycopg2
from config import configObj 
import pandas as pd
import json
from service.dao.QueryMapper import QueryMapper
import mybatis_mapper2sql
from psycopg2.extras import RealDictCursor

class getConn():
    def __init__(self):
        self.db        = psycopg2.connect(
             host      = configObj.DATABASE_CONFIG['DATABASE_HOST'], 
            dbname     = configObj.DATABASE_CONFIG['DATABASE_DB'],
            user       = configObj.DATABASE_CONFIG['DATABASE_USER'],
            password   = configObj.DATABASE_CONFIG['DATABASE_PW']
        )
        self.cursor = self.db.cursor()
        self.result = "Y"

    def __del__(self):
        print('connection close')
        self.db.close()
        self.cursor.close()

    def execute(self,query,args):
        print(":;execute::" ,args)
        self.cursor.execute(query,args)
        row = self.cursor.fetchall()
        return row

    def commit(self):
        self.cursor.commit()


    def selectList(self ,params ,query):
        try:
            #print("::::::execute::::: " , params , type(params))
            #sql = query.format(*params)
            print(":::::::::::::::::::params:::::::::::::::::::")
            print("params=",params)
            print(":::::::::::::::::::params:::::::::::::::::::")
            print("")
            print("*******************query*******************")
            print("query=" , query)
            print("*******************query*******************")
            #testObj = {"id":"2002" ,"name":"test"}
            #query = "select shop_id ,shop_nm from h_shop_mstr_test where 1=1 and shop_id =  %(id)s"
            self.cursor.execute(query ,params)
            #columns  = list(self.cursor.description)
            columns = [desc[0] for desc in self.cursor.description]
            results = [dict(zip(columns, row)) for row in self.cursor.fetchall()]

            #result = self.cursor.fetchall()
            print("")
            print(":::::::::::::::::::result:::::::::::::::::::" , results)
            #result = list #json.dumps(list ,ensure_ascii=False)
            
            
           
            #ret = list(map(lambda x: x[0], self.cursor.description))
            #print(":::::::::::::::::::ret:::::::::::::::::::" ,ret)
            # results = []
            # for row in result:
            #     row_dict = {}
            #     for i, col in enumerate(columns):
            #         row_dict[col.name] = row[i]
            #     results.append(row_dict)

        except Exception as e :
            print("selectList exception" ,e)

        return results

    def insert(self ,query):
        try :
            self.cursor.execute(query)
            self.db.commit()
        except Exception as e :
            print(" insert exception",e)
            self.result = "N"
        return self.result
    
    def update(self ,query):
        try :
            self.cursor.execute(query)
            self.db.commit()
        except Exception as e :
            print(" update exception",e)

    def delete(self ,query):
        try :
            self.cursor.execute(query)
            self.db.commit()
        except Exception as e :
            print("delete exception",e)


class excuteQuery :
    def selectList(self) :
        mapper, xml_raw_text = mybatis_mapper2sql.create_mapper(xml=self.xml)
        sql = mybatis_mapper2sql.get_child_statement(mapper ,self.queryId, reindent=True, strip_comments=False)
        
        result = getConn().selectList(self.params ,sql)
        return result
 

    def insert(query) :
        return getConn().insert(query)



    # conn_string = "host = 'localhost' dbname = 'hillstate' user = 'hillstate' password = 'hillstate123'"
    # conn = psycopg2.connect(conn_string)
    # cur = conn.cursor()

    # print(configObj.DATABASE_CONFIG['DATABASE_HOST'])

# cur.execute("select shop_id ,shop_nm from h_shop_mstr_test")
# # 예시
# # cur.execute("SELECT * FROM [DB명];")

# result = cur.fetchall() # result에 결과 저장

# # 쿼리문 실행 결과를 pandas dataframe 형식으로 만들기
# my_df = pd.DataFrame(result) 
# my_df.columns = [desc[0] for desc in cur.description]
# print(my_df)