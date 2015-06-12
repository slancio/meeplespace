json.(city, :id, :name, :description)
json.img_url asset_path(city.img_url)
json.hosts city.hosts do |host|
  json.id host.id
  json.nickname host.nickname
  json.avatar asset_path(host.avatar.url(:thumb))
end
json.city_events events.order(:date) do |event|
  json.id event.id
  json.date event.date
  if ((current_user && (
      current_user.events.include?(event) ||
      current_user.hosted_events.include?(event))
      ) || !event.location_privacy)
    json.location event.location
  else
    json.location "Location will be emailed to attendees"
  end
  json.location_privacy event.location_privacy
  json.slots event.slots
  json.host_id event.host_id
  json.num_attendees event.attendees.length
  json.game_title event.game.title
end
