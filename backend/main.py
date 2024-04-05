import psycopg2
from unidecode import unidecode
import base64
from psycopg2.extras import LoggingConnection
#sys.setdefaultencoding('utf-8')

conn_string = "host='localhost' dbname='hillstate' user='hillstate' password= hillstate123'"

conect = "host=localhost dbname=hillstate user=hillstate password=hillstate123"
print ("conect" , conn_string)
v_database = 'hillstate'.encode('utf-8')
v_host= str('localhost'.encode('utf-8')).replace('b','')
v_user = 'hillstate'.encode('utf-8')
v_password = 'hillstate123'.encode('utf-8')

print("안녕하세요" ,conn_string )

encoded = base64.b64encode (bytes(conn_string, "utf-8"))
encoded = str(conect.encode('utf-8'))
print(encoded.replace('b',''))
local = encoded.replace('b','')
# decoded_text = base64.decodebytes(encoded)
# print(decoded_text)

pg_connection_dict = {
    'dbname': "hillstate",
    'user': "defore",
    'password': "defore123",
    'port': 5432,
    'host': "localhost"
}
print(pg_connection_dict)
conn = psycopg2.connect(
 #"host=127.0.0.1 port=5432 dbname=hillstate user=hillstate password=hillstate123  client_encoding=utf8"
        #host="localhost" ,dbname="hillstate" ,port=5432 ,user="hillstate"  ,password="hillstate123"
  **pg_connection_dict      
 #conect #,connection_factory=LoggingConnection
)
cursor = conn.cursor()
cursor.execute('select \'Hello World\'')
for row in cursor:
 print(row)
# cur = conn.cursor()

 
# print(conn_string)


# cur.execute("select * from h_shop_mstr_test")
# # 예시
# # cur.execute("SELECT * FROM [DB명];")

# result = cur.fetchall() # result에 결과 저장

# # 쿼리문 실행 결과를 pandas dataframe 형식으로 만들기
# my_df = pd.DataFrame(result) 
# my_df.columns = [desc[0] for desc in cur.description]

