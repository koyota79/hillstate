from flask import request
from flask_restx import Resource, Api, Namespace


event = Namespace('event')

@event.route('')
class Event(Resource):
    def post(self):
        print(111111111)
        result =  {"siteMap": "siteMap!"}
        
        return result
    
@event.route('/list')
class EventList(Resource):
    def post(self):
        print(2222222)
        result =  {"siteMap": "list1111!"}
        
        return result