from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from string import Template
import re
import pandas as pd
import os 
import time
from classes import House

dir_path = os.path.dirname(os.path.realpath(__file__))
driver = webdriver.Chrome()
template = Template('https://www.zillow.com/homes/for_sale/?searchQueryState={%22pagination%22:{},%22mapBounds%22:{%22west%22:$bound_west,%22east%22:$bound_east,%22south%22:$bound_south,%22north%22:$bound_north},%22isMapVisible%22:true,%22filterState%22:{},%22isListVisible%22:true}')
regex = re.compile(r'^([\d\.]+) ?[A-z]*$')

def parse_price_range(price_range):
    lower = upper = 0
    if '-' in price_range:
        match = re.match(r'^\$([\d,]+) ?- ?\$([\d,]+)$', price_range)
        lower = int(match.group(1).replace(',', ''))
        upper = int(match.group(2).replace(',', ''))
    elif '<' in price_range:
        lower = 0
        upper = int(price_range[price_range.find('$')+1:].replace(',', ''))
    elif '>' in price_range:
        lower = int(price_range[price_range.find('$')+1:].replace(',', ''))
        upper = -1
    else:
        raise Exception('Invalid price range')
    return lower, upper

def __get_houses(bound_west, bound_east, bound_south, bound_north, price_range, bed, bath):
    driver.get(template.substitute(bound_west=bound_west, bound_east=bound_east, bound_south=bound_south, bound_north=bound_north))
    infos = driver.find_elements_by_class_name('list-card')
    lower_price, upper_price = parse_price_range(price_range) if price_range != '-1--1' else (-1, -1)
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
        price = int(i.find_element_by_class_name('list-card-price').text.replace(',', '').replace('$', '').replace('Est. ', ''))
        img_url = i.find_element_by_tag_name('img').get_attribute('src')

        details = i.find_element_by_class_name('list-card-details').find_elements_by_tag_name('li')
        bedrooms = int(regex.match(details[0].text).group(1))
        bathrooms = float(regex.match(details[1].text).group(1))
        sqft = details[2].text.replace(',', '')
        sqft = int(regex.match(sqft).group(1))

        if price > lower_price and (price <= upper_price or upper_price < 0) and (bedrooms == bed or bed < 0) and (bathrooms == bath or bath < 0):
            res.append(House(address, price, bedrooms, bathrooms, sqft, img_url, 0, 0, 0, 0))
    
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
        for i in range(1, 6):
            if zip_code in prices_map[f'{bedrooms}-bd-rent'].keys():
                found = True
                bedrooms = i
                break
        if not found:
            raise Exception(f'Data not present for ZIP code {zip_code}')
    return prices_map[f'{bedrooms}-bd-rent'][zip_code] * int(sq_feet)

def add_exp_value(houses, prices):
    for i in range(len(houses)):
        postal_code = houses[i].address[-5:]
        try:
            houses[i].value = get_sale_value(int(postal_code), int(houses[i]['sqft']), prices)
        except:
            pass
        try:
            houses[i].exp_rent = get_rent_value(int(postal_code), int(houses[i]['sqft']), int(houses[0]['bedrooms']), prices)
        except:
            pass

def get_houses(bounds, price_range, bed, bath):
    prices = build_price_map()
    houses = __get_houses(*bounds, price_range, bed, bath)
    add_exp_value(houses, prices)
    return houses