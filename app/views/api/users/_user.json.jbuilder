if (current_user.id == user.id) do
  json.(user, :id, :nickname, :email, :city_id, :host)
  json.array! user.hosted_events, :id, :date, :location, :host_id, as: :hosted_event
  json.array! user.events, :id, :date, :location, :host_id, as: :event
else
  json.(user, :id, :nickname, :city_id, :host)
  json.array! user.hosted_events, :id, :date, :location, :host_id, as: :hosted_event
end
