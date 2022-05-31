import csv
import random
import re
import datetime

def parse_openhours(txt):
    weekday = '一二三四五六日'
    cur_day = list(range(7))
    ans = [[] for i in range(7)]
    for p in re.findall(r'([一二三四五六日]+|\d\d:\d\d[–-]\d\d:\d\d|休息)', txt):
        if re.match(r'([一二三四五六日]+)', p):
            cur_day = [weekday.index(x) for x in p]
        elif p == '休息':
            for i in cur_day:
                ans[i] = []
        else:
            du = re.match(r'(\d\d):(\d\d)[–-](\d\d):(\d\d)', p)
            start = int(du[1]) * 60 + int(du[2])
            end = int(du[3]) * 60 + int(du[4])
            for i in cur_day:
                ans[i].append((start, end))
    return ans

def is_current_open(openhours):
    now = datetime.datetime.now()
    tm = now.hour * 60 + now.minute
    if openhours[now.weekday()]:
        for y in openhours[now.weekday()]:
            if y[0] <= tm < y[1]:
                return True
    return False

class RestaurantFinder:
    def __init__(self, tsv_file):
        self.restaurants = []
        with open(tsv_file, 'r', encoding='utf8') as fin:
            read = csv.DictReader(fin, delimiter='\t')
            for row in read:
                if row['openhours'] in {'暫停營業', '永久歇業'}:
                    continue
                row['openhours'] = parse_openhours(row['openhours'])
                types = row['type'].split('/')
                row['type'] = types
                self.restaurants.append(row)
    def search(self, places, want, donts):
        ans = []
        want = set(want)
        meats = {'雞', '豬', '牛'} & want
        rice = {'飯', '麵', '水餃'} & want
        chinese = {'中式', '西式', '日式'} & want
        for r in self.restaurants:
            can = r['place'] in places
            if not is_current_open(r['openhours']):
                can = False
            
            types = set(r['type'])
            if meats:
                if not (meats & types):
                    can = False
            
            if rice:
                if not (rice & types):
                    can = False

            if chinese:
                if not (chinese & types):
                    can = False

            if can:
                ans.append(r)
        
        # random sample 10 restaurants
        ans = random.sample(ans, min(10, len(ans)))
        return [{'id': r['id'], 'name': r['name']} for r in ans]
