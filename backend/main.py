import psycopg2
import pandas as pd

conn_string = "host = 'localhost' dbname = 'hillstate' user = 'hillstate' password = 'hillstate123'"
conn = psycopg2.connect(conn_string)
cur = conn.cursor()


print(config.DATABASE_CONFIG['DATABASE_HOST'])


# cur.execute("select * from h_shop_mstr_test")
# # 예시
# # cur.execute("SELECT * FROM [DB명];")

# result = cur.fetchall() # result에 결과 저장

# # 쿼리문 실행 결과를 pandas dataframe 형식으로 만들기
# my_df = pd.DataFrame(result) 
# my_df.columns = [desc[0] for desc in cur.description]

