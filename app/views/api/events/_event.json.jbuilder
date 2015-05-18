if ((current_user && (
      current_user.events.include?(event) ||
      current_user.hosted_events.include?(event))
    ) || !event.location_privacy)
  json.(event, :id, :date, :location, :location_privacy, :slots, :host_id)
else
  json.(event, :id, :date, :location_privacy, :slots, :host_id)
  json.location "Location will be emailed to attendees"
end

json.attendees event.attendees do |attendee|
  if (current_user && current_user.events.include?(event))
    json.id attendee.id
    json.nickname attendee.nickname
  elsif (current_user && current_user.hosted_events.include?(event))
    json.id attendee.id
    json.nickname attendee.nickname
    json.email attendee.email
  end
end

json.event_host do
  json.id event.event_host.id
  json.nickname event.event_host.nickname
end