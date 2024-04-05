from flask import request ,jsonify ,make_response
from flask_restx import Resource, Api, Namespace
from service.MainHomeService import MainHomeService
import os
import json

mainHome = Namespace('mainHome')
service = MainHomeService()

def UrlParamMap(func):
    def innerfunc (self ,*args ,**kwargs):        
        print( request.json ,type(request.json) )
        parmas = request.json
        dataObj = {}
        for k ,v in parmas.items() :
            print(k , v)
            dataObj[k] = v
        return func(self ,dataObj)
    return innerfunc 



@mainHome.route('')
class MainHome(Resource):
    @UrlParamMap
    def post(self ,dataObj):    
        print(dataObj ,dataObj["id"])   
        self.params = dataObj #(dataObj["id"] ,'test')
        return service.getList(self) 


@mainHome.route('shop_data/<shop_id>') 
class MainSlideList(Resource):
    def get(self ,shop_id ):

        retData = {}
        if shop_id == "getMainSlide" : 
            retData["main_list"] = service.getMainSlideList("MainSlide")
            retData["sub_list"] = service.getMainSlideList("SubSlide")          


        # print( json.dumps(params['data']))
        # jsonObj = json.loads(params['data']) 
        # #print(jsonObj["id"])
        # result =  jsonObj["id"]
        return retData    
    
    def post(self ,shop_id):
        
        result =  {"hello": "33333"}
        print(result )
        
        return result






#     def build_preflight_response():
#     response = make_response()
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     response.headers.add('Access-Control-Allow-Headers', "*")
#     response.headers.add('Access-Control-Allow-Methods', "*")
#     return response
    
# def build_actual_response(response):
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     return response