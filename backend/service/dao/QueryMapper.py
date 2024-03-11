
import mybatis_mapper2sql
from functools import wraps 
import os


#base_dir = os.path.abspath(os.path.dirname(__file__))
# xml = os.path.join(base_dir, 'MainHomeDao.xml')
# print(xml) G:\workspace\backend\service\dao\MainHomeDao.xml

class QueryMapper(object ) :
   def __new__(self ,*args): 
      print("::QueryMapper::" ,args )
      base_dir = os.path.abspath(os.path.dirname(__file__))
      xml = os.path.join(base_dir, args[0])
      return xml
    
       
   #*args 와 **kwargs  args tuple(1,2,3,) kwargs dict {'a': 1}
   # def __call__(self ,func):
   #    print("QueryMapper __call__" )
   #    def wrapped_f(self ,*args):

   #       print ("Inside wrapped_f()")
   #       func(*args)
   #       print ("Decorator arguments:", self.arg1)
   #       print ("After f(*args)")

   #    return wrapped_f


   def mapper(self, *args):
      print("QueryMapper __call__" )
      def wrapped_f(self ,*args):

         print ("Inside wrapped_f()")
         print ("Decorator arguments:", args)
         print ("After f(*args)")
 
      return wrapped_f
    
   # def __get__(self, instance, owner): 
   #    print("QueryMapper __get__" ,self)
   #    print("QueryMapper __get__" ,owner)
   #    print("QueryMapper __get__" ,owner.__name__)    

   #    if instance is None:
   #       return self
   #    return self.function
        
        
        #return self.func( *args, **kwds)
