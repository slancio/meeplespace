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
    json.avatar asset_path(attendee.avatar.url(:thumb))
  elsif (current_user && current_user.hosted_events.include?(event))
    json.id attendee.id
    json.nickname attendee.nickname
    json.email attendee.email
    json.avatar asset_path(attendee.avatar.url(:thumb))
  end
end

json.event_host do
  json.id event.event_host.id
  json.nickname event.event_host.nickname
  json.avatar asset_path(event.event_host.avatar.url(:profile))
end

json.game do
  json.id event.game.id
  json.title event.game.title
  json.year event.game.year
  json.img_url event.game.img_url
  json.bgg_id event.game.bgg_id
end