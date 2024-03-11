from flask import request
from flask_restx import Resource, Api, Namespace


siteMap = Namespace('siteMap')

@siteMap.route('')
class SiteMap(Resource):
    def post(self):
        print(111111111)
        result =  {"siteMap": "siteMap!"}
        
        return result
    
@siteMap.route('/list')
class SiteMapList(Resource):
    def post(self):
        print(2222222)
        result =  {"siteMap": "list1111!"}
        
        return result