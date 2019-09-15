from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from string import Template
import re
import pandas as pd
import os 
import time

dir_path = os.path.dirname(os.path.realpath(__file__))
driver = webdriver.Chrome()
template = Template('https://www.zillow.com/homes/for_sale/?searchQueryState={%22pagination%22:{},%22mapBounds%22:{%22west%22:$bound_west,%22east%22:$bound_east,%22south%22:$bound_south,%22north%22:$bound_north},%22isMapVisible%22:true,%22filterState%22:{},%22isListVisible%22:true}')
regex = re.compile(r'^([\d\.]+) ?[A-z]*$')

def get_houses(bound_west, bound_east, bound_south, bound_north):
    driver.get(template.substitute(bound_west=bound_west, bound_east=bound_east, bound_south=bound_south, bound_north=bound_north))
    infos = driver.find_elements_by_class_name('list-card')

    res = []

    driver.execute_script("window.scrollTo(0, document.body.scrollHeight / 5);")
    time.sleep(1)
    driver.execute_script("window.scrollTo(0, 2 * document.body.scrollHeight / 5);")
    time.sleep(1)
    driver.execute_script("window.scrollTo(0, 3 * document.body.scrollHeight / 8);")
    time.sleep(1)
    driver.execute_script("window.scrollTo(0, 3 * document.body.scrollHeight / 5);")
    time.sleep(1)
    driver.execute_script("window.scrollTo(0, 4 * document.body.scrollHeight / 5);")

    for i in infos:
        address = i.find_element_by_class_name('list-card-addr').text
        postal_code = address[-5:]
        price = i.find_element_by_class_name('list-card-price').text.replace(',', '').replace('$', '')
        img_url = i.find_element_by_tag_name('img').get_attribute('src')

        details = i.find_element_by_class_name('list-card-details').find_elements_by_tag_name('li')
        bedrooms = regex.match(details[0].text).group(1)
        bathrooms = regex.match(details[1].text).group(1)
        sqft = details[2].text.replace(',', '')
        sqft = regex.match(sqft).group(1)

        res.append({'address': address, 'zip': postal_code, 'price': int(price), 'bedrooms': int(bedrooms), 'bathrooms': float(bathrooms), 'sqft': int(sqft), 'img_url': img_url})
    
    return res

def build_price_map():
    sale_prices = pd.read_csv(dir_path + '/data/Zip_MedianListingPricePerSqft_AllHomes.csv', encoding='latin-1')
    one_bd_rent = pd.read_csv(dir_path + '/data/Zip_MedianRentalPricePerSqft_1Bedroom.csv', encoding='latin-1')
    two_bd_rent = pd.read_csv(dir_path + '/data/Zip_MedianRentalPricePerSqft_2Bedroom.csv', encoding='latin-1')
    three_bd_rent = pd.read_csv(dir_path + '/data/Zip_MedianRentalPricePerSqft_3Bedroom.csv', encoding='latin-1')
    four_bd_rent = pd.read_csv(dir_path + '/data/Zip_MedianRentalPricePerSqft_4Bedroom.csv', encoding='latin-1')
    five_bd_rent = pd.read_csv(dir_path + '/data/Zip_MedianRentalPricePerSqft_5BedroomOrMore.csv', encoding='latin-1')
    
    map = {}
    map['sale'] = {row['RegionName']: row['2019-07'] for _, row in sale_prices.iterrows()}
    map['1-bd-rent'] = {row['RegionName']: row['2019-07'] for _, row in one_bd_rent.iterrows()}
    map['2-bd-rent'] = {row['RegionName']: row['2019-07'] for _, row in two_bd_rent.iterrows()}
    map['3-bd-rent'] = {row['RegionName']: row['2019-07'] for _, row in three_bd_rent.iterrows()}
    map['4-bd-rent'] = {row['RegionName']: row['2019-07'] for _, row in four_bd_rent.iterrows()}
    map['5-bd-rent'] = {row['RegionName']: row['2019-07'] for _, row in five_bd_rent.iterrows()}

    return map

def get_sale_value(zip_code, sq_feet, prices_map):
    if zip_code not in prices_map['sale'].keys():
        raise Exception(f'Data not present for ZIP code {zip_code}')
    
    return prices_map['sale'][zip_code] * int(sq_feet)

def get_rent_value(zip_code, sq_feet, bedrooms, prices_map):
    bedrooms = min(bedrooms, 5)
    if zip_code not in prices_map[f'{bedrooms}-bd-rent'].keys():
        found = False
        for bedrooms in range(1, 6):
            if zip_code in prices_map[f'{bedrooms}-bd-rent'].keys():
                found = True
                bedrooms = i
                break
        if not found:
            raise Exception(f'Data not present for ZIP code {zip_code}')
    return prices_map[f'{bedrooms}-bd-rent'][zip_code] * int(sq_feet)

def add_exp_value(houses, prices):
    for i in range(len(houses)):
        try:
            houses[i]['exp_sale'] = get_sale_value(int(houses[i]['zip']), int(houses[i]['sqft']), prices)
        except:
            pass
        try:
            houses[i]['exp_rent'] = get_rent_value(int(houses[i]['zip']), int(houses[i]['sqft']), int(houses[0]['bedrooms']), prices)
        except:
            pass

bos_bounds = (-71.23696749877928, -70.85828250122069, 42.205313777605404, 42.42136394309102)
prices = build_price_map()
houses = get_houses(*bos_bounds)
add_exp_value(prices, houses)
print(houses)