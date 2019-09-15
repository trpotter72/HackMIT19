import googlemaps
import math

gmaps = googlemaps.Client(key='AIzaSyC7X-p2kmN6spNNIMpApfBIJltahheLKa4')
earth_radius_miles = 3958.8

def bounding_box(center, dist_miles):
    rad_dist = dist_miles / earth_radius_miles
    rad_lat = center[0] * math.pi / 180
    rad_lng = center[1] * math.pi / 180
    min_lat = rad_lat - rad_dist
    max_lat = rad_lat + rad_dist

    min_lng = max_lng = 0
    if min_lat > -math.pi / 2 and max_lat < math.pi / 2:
        delta_lng = math.asin(math.sin(rad_dist) / math.cos(rad_lat))
        min_lng = rad_lng - delta_lng
        if min_lng < -math.pi:
            min_lng += 2 * math.pi
        if max_lng > math.pi:
            max_lng -= 2 * math.pi
    else:
        min_lat = max(min_lat, -math.pi / 2)
        max_lat = min(max_lat, math.pi / 2)
        min_lng = -math.pi
        max_lng = math.pi
    
    bounds_radians = [min_lng, max_lng, min_lat, max_lat]
    return [b * 180 / math.pi for b in bounds_radians]

def get_bounds(zip, dist_miles):
    res = gmaps.geocode(str(zip))
    pos = res[0]['geometry']['location']
    return bounding_box([pos['lat'], pos['lng']], dist_miles)