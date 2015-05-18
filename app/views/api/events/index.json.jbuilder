json.partial! "api/events/event", collection: @events, as: :event
if (current_user && current_user.host)
  json.partial! "api/events/event", collection: @hosts_events, as: :event
end
  