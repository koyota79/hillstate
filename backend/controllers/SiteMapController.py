from flask import request
from flask_restx import Resource, Api, Namespace
from service.SiteMapService import SiteMapService



siteMap = Namespace('siteMap')
service = SiteMapService()

@siteMap.route('')
class SiteMap(Resource):
    def get(self):
        params = { 'position_idx' : ''}
        retShopData = {}
        retShopData['shop_map_list'] = service.getShopMapList(params)
        return retShopData
    
@siteMap.route('/<floor_idx>')
class SiteMapList(Resource):
    def get(self , floor_idx):
        params = { 'position_idx' :floor_idx}
        retShopData = {}
        retShopData['shop_map_list'] = service.getShopMapList(params)
        
        return retShopData