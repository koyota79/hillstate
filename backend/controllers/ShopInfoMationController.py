from flask import request
from flask_restx import Resource, Api, Namespace
from service.ShopInfoMationService import ShopInforMationService

shopInfo = Namespace('shopInfo')
service = ShopInforMationService()
    
@shopInfo.route('/<shop_id>') 
class ShopInfo(Resource):
    #상점 상세 정보
    def get(self ,shop_id ):  
        shopInfo =  service.getShopDeltail(shop_id)
        result =  {
            "shop_detail": shopInfo ,
            "shop_content" : "test"           
        }

        return result
    
@shopInfo.route('/list')
class ShopInfoList(Resource):
    def post(self):
        print(2222222)
        result =  {"shopInfo": "list1111!"}
        
        return result