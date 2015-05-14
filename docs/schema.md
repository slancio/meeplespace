# Schema Information

## cities
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
img_url     | string    | not null

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
nickname        | string    | not null
password_digest | string    | not null
session_token   | string    | not null, unique
city_id         | integer   | not null, foreign key
host            | boolean   | not null, default false
avatar_url      | string    | not null
short_desc      | text      |
long_desc       | text      |

## events
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
date             | date      | not null
location         | string    | not null
location_privacy | boolean   | not null, default false
slots            | integer   | not null
host_id          | integer   | not null, foreign key (references users)
game_id          | integer   | not null, foreign key (references games)

## games
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
title        | string    | not null
img_url      | string    |
bgg_id       | integer   |

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
event_id    | integer   | not null, foreign key (references events)
img_url     | string    |
text        | text      |

## outings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
event_id    | integer   | not null, foreign key (references events)
user_id     | integer   | not null, foreign key (referenecs users)

