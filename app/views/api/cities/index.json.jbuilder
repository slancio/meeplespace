json.array! @cities do |city|
  json.id city.id
  json.name city.name
  json.img_url asset_path(city.img_url)
end