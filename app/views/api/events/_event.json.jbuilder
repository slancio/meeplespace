if (current_user && (current_user.events.concat(current_user.hosted_events).include?(event)) || 
    !event.location_privacy)
  json.(event, :id, :date, :location, :location_privacy, :slots, :host_id)
else
  json.(event, :id, :date, :location_privacy, :slots, :host_id)
  json.location "Location will be emailed to attendees"
end

json.event_host event.event_host do |host|
  json.id host.id
  json.nickname host.nickname
end

json.attendees event.attendees do |attendee|
  if (current_user && current_user.events.include?(event.id))
    json.id attendee.id
    json.nickname attendee.nickname
  elsif (current_user && current_user.hosted_events.include?(event.id))
    json.id attendee.id
    json.nickname attendee.nickname
    json.email attendee.email
  end
end