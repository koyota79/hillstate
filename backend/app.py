from flask import Flask 
from flask_restx import Resource, Api 
from flask_cors import CORS
from controllers.MainController import mainHome
from controllers.SiteMapController import siteMap
from controllers.ShopInfoMationController import shopInfo
from controllers.EventController import event

app = Flask(__name__)
CORS(app) #, resources={r'*': {'origins': ['http://localhost:5000', 'http://localhost:80']}}
api = Api(app)


  
api.add_namespace(mainHome, '/')
api.add_namespace(shopInfo, '/shop_info')
api.add_namespace(siteMap, '/site_map') 
api.add_namespace(event, '/event')

# @app.route('/')
# def mainHome():
#     return 'Hello, World!'

if __name__ == '__main__':
    app.run( port=5000, debug=True)
