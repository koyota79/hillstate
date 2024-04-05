
import psycopg2
from config import configObj 
import pandas as pd
import json
#from service.dao.QueryMapper import QueryMapper
import mybatis_mapper2sql
from psycopg2.extras import LoggingConnection
#from psycopg2.extras import RealDictCursor
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

class getConn():
    def __init__(self):
        db_settings = {
            "user": configObj.DATABASE_CONFIG['DATABASE_USER'],
            "password": configObj.DATABASE_CONFIG['DATABASE_PW'],
            "host": configObj.DATABASE_CONFIG['DATABASE_HOST'],
            "dbname": configObj.DATABASE_CONFIG['DATABASE_DB']
        }
        self.db = psycopg2.connect(connection_factory=LoggingConnection, **db_settings)

        # self.db        = psycopg2.connect(
        #     host       = configObj.DATABASE_CONFIG['DATABASE_HOST'], 
        #     dbname     = configObj.DATABASE_CONFIG['DATABASE_DB'],
        #     user       = configObj.DATABASE_CONFIG['DATABASE_USER'],
        #     password   = configObj.DATABASE_CONFIG['DATABASE_PW'],
        
        #     connection_factory = LoggingConnection
        # )
        #self.db.set_client_encoding("UTF8")
        self.db.initialize(logger)
        self.cursor = self.db.cursor() 
        self.result = "Y"

    def __del__(self):
        print('connection close')
        self.db.close()
        self.cursor.close()

    def execute(self,query,args):
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
            # print("")
            # print("*******************query*******************")
            # print("query=" , query)
            # print("*******************query*******************")
            #testObj = {"id":"2002" ,"name":"test"}
            #query = "select shop_id ,shop_nm from h_shop_mstr_test where 1=1 and shop_id =  %(id)s"
            self.cursor.execute(query ,params)
            #columns  = list(self.cursor.description)
            columns = [desc[0] for desc in self.cursor.description]
            result = [dict(zip(columns, row)) for row in self.cursor.fetchall()]

            #result = self.cursor.fetchall()
            print("")
            print("result=" , result)
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

        return result
    


    def selectOne(self ,params ,query) :
        try :
            self.cursor.execute(query ,params)
            row = self.cursor.fetchone()
            rowDict = dict(zip([c[0] for c in self.cursor.description], row ))
            print("result" ,rowDict)
        except Exception as e :
            print(" selectOne exception",e)

        return rowDict
    

    def insert(self ,query) :
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
        print("excuteQuery")
        result = getConn().selectList(self.params ,sql)
        return result
 

    def insert(query) :
        return getConn().insert(query)


    def selectOne(self) :
        mapper, xml_raw_text = mybatis_mapper2sql.create_mapper(xml=self.xml)
        sql = mybatis_mapper2sql.get_child_statement(mapper ,self.queryId, reindent=True, strip_comments=False)
        result = getConn().selectOne(self.params ,sql)
        return result

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