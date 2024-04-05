from DbConnect import excuteQuery
from service.dao.QueryMapper import QueryMapper



class ShopInforMationService : 
    def __init__(self): 
        self.xml = QueryMapper("ShopInforMationDao.xml")


    def getShopDeltail(self ,shop_id ) :
        try :     
            self.queryId = "selectShopInfoDetail" 
            self.params = {"shop_id" : shop_id}          
            shopData = excuteQuery.selectOne(self)
        except Exception as e :
            print("service err",e)
            return {"E" : "service err=" + e} 
        return shopData