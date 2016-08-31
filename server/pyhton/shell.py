from sqlalchemy import create_engine
import tushare as ts
import sys

engine = create_engine('mysql://root:root@localhost:3306/stock?charset=utf8')

# switch case
def getList():
    ts.get_stock_basics().to_sql('stock_list',engine,if_exists='append')
def getToday():
    ts.get_today_all().to_sql('stock_today',engine,if_exists='append')
dict = {
    'getList': getList,
    'getToday':getToday,
}
dict[sys.argv[1]]()