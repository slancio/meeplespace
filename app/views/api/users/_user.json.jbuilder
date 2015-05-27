if (user == current_user)
  json.(user, :id, :nickname, :email, :city_id, :host, :short_desc, :long_desc)
  json.avatar asset_path(user.avatar.url(:thumb))
  json.avatar_full asset_path(user.avatar.url(:profile))
  json.hosted_events user.hosted_events do |hosted_event|
    json.id hosted_event.id
    json.date hosted_event.date
    json.location hosted_event.location
    json.location_privacy hosted_event.location_privacy
    json.host_id hosted_event.host_id
    json.slots hosted_event.slots
    json.num_attendees hosted_event.attendees.length
  end
  json.attended_events user.events do |event|
    json.id event.id
    json.date event.date
    json.location event.location
    json.host_id event.host_id
    json.slots event.slots
    json.num_attendees event.attendees.length
  end
else
  json.(user, :id, :nickname, :city_id, :host)
  json.avatar_url asset_path(user.avatar.url(:thumb))
  json.hosted_events user.hosted_events do |hosted_event|
    json.id hosted_event.id
    json.date hosted_event.date
    unless hosted_event.location_privacy
      json.location hosted_event.location
    else
      json.location "Location will be emailed to attendees"
    end
    json.location_privacy hosted_event.location_privacy
    json.host_id hosted_event.host_id
    json.slots hosted_event.slots
    json.num_attendees hosted_event.attendees.length
  end
end
