if (current_user.events.concat(current_user.hosted_events).include?(event) || !event.location_privacy)
  json.(event, :id, :date, :location, :location_privacy, :slots, :host_id)
else
  json.(event, :id, :date, :location_privacy, :slots, :host_id)
  json.location "Location will be emailed to attendees"
end

if current_user.events.include?(event.id)
  json.array! event.attendees, :id, :nickname, as: :attendee
end

if current_user.hosted_events.include?(event.id)
  json.array! event.attendees, :id, :nickname, :email, as: :attendee
end