from DbConnect import excuteQuery
from service.dao.QueryMapper import QueryMapper



class SiteMapService : 
    def __init__(self): 
        self.xml = QueryMapper("ShopInforMationDao.xml")


    def getShopMapList(self ,p_params) :
        try :     
            self.queryId = 'selectShopMapList'
            self.params = p_params        
            list = excuteQuery.selectList(self) 
        except Exception as e :
            print("service err",e)
            return [] 
        return list