from DbConnect import excuteQuery
import mybatis_mapper2sql
import os ,json
from service.dao.QueryMapper import QueryMapper




# def decorator_function(original_function):
#     def wrapper_function(*args, **kwargs):
#         print('{} 함수가 호출되기전 입니다.'.format(original_function.__name__))


#         return original_function(*args, **kwargs)
#     return wrapper_function

# def register_event(self):
#     print("register_event" , self)
#     mapper, xml_raw_text = mybatis_mapper2sql.create_mapper(xml=xml)
#     self.mapper = mapper
#     queryId = "selectShopList"
#     sql = mybatis_mapper2sql.get_child_statement(self.mapper ,queryId, reindent=True, strip_comments=False)
#     print("sql" , self.mapper)
#     return self

# base_dir = os.path.abspath(os.path.dirname(__file__))
# base_dir = base_dir + "\\dao"
# xml = os.path.join(base_dir, 'MainHomeDao.xml')
# print(xml) 


class MainHomeService : 
    def __init__(self): 
        self.xml = QueryMapper("MainHomeDao.xml")
        #self.params = args[0]
        #self.xml = os.path.join(base_dir, 'MainHomeDao.xml')   
        # mapper, xml_raw_text = mybatis_mapper2sql.create_mapper(xml=xml)
        # self.mapper = mapper
        # queryId = "selectShopList"
        # sql = mybatis_mapper2sql.get_child_statement(self.mapper ,queryId, reindent=True, strip_comments=False)
        #statement = mybatis_mapper2sql.get_statement(mapper, result_type='raw', reindent=True, strip_comments=True)
        # statement = mybatis_mapper2sql.get_child_statement(mapper,'selectShopList', reindent=True, strip_comments=False)
        # print(statement)

    def getList(self) :
        try :     
            self.sql = """
                  select shop_id ,shop_nm ,open_time ,close_time ,tel_no
                        ,position ,use_yn ,position_area ,category ,description
                        ,case when position_area = 0 then '가' 
                            when position_area = 1 then '나' 
                            when position_area = 2 then '다' 
                            when position_area = 3 then '라'
                        end as position_nm 
                       ,img_slide_yn ,time_type ,time_desc ,close_day ,major_item
                    from h_shop_mstr
                    where use_yn = 'Y'
                    order by position ,shop_id 
            """
            self.params = {}           
            list = excuteQuery.selectListNew(self)
        except Exception as e :
            print("service err",e)
            return [] 
        return list
    
    #메인 슬라이드 이미지
    def getMainSlideList(self ,type) :
        try : 
            self.queryId = ""    
            self.queryId = "selectShopSlideList"  
            if type == "MainSlide" :
                self.params = {"main_show_yn" : "Y"}           
            elif type == "SubSlide" :
                self.params = {"main_show_yn" : "N"}  
            list = excuteQuery.selectList(self)
 
        except Exception as e :
            print("service err",e)
            return [] 
        return list




# class getShopList():
#     def selectList(self) :
#         return MainHomeService.getList("selectShopList")




