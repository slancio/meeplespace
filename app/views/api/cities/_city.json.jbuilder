json.(city, :id, :name, :img_url)
json.array! city.hosts, :id, :nickname, as: :host
json.events city.events do |event|
  json.id event.id
  json.data event.date
  if (current_user.events.concat(current_user.hosted_events).include(event) || !event.location_privacy)
    json.location event.location
  else
    json.location "Location will be emailed to attendees"
  end
  json.location_privacy event.location_privacy
  json.slots event.slots
  json.host_id event.host_id
end
