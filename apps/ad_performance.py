import csv

csv_data = """ad_id,clicks,impressions,cost
1,100,10000,50.00
2,150,12000,75.00
3,200,15000,100.00
4,50,8000,30.00
5,300,25000,125.00"""

from io import StringIO
data_io = StringIO(csv_data)
reader = csv.DictReader(data_io)

def cal_ctr(clicks, impress):
    if impress == 0:
        return 0
    return (clicks / impress) * 100

def cal_cpc(cost, clicks):
    if clicks == 0:
        return 0
    return (cost / clicks) * 100

print(f"{'Ad ID':<6} {'Clicks':<8} {'Impressions':<12} {'Cost($)':<8} {'CTR(%)':<8} {'CPC($)':<8}")

for row in reader:
    ad_id = row['ad_id']
    clicks = int(row['clicks'])
    impressions = int(row['impressions'])
    cost = float(row['cost'])

    ctr = cal_ctr(clicks, impressions)
    cpc = cal_cpc(cost , clicks)

    print(f"{ad_id:<6} {clicks:<8} {impressions:<12} {cost:<8.2f} {ctr:<8.2f} {cpc:<8.2f}")
