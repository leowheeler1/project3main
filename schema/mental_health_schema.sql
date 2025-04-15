drop table if exists mental;

create table mental (
	"indicator" varchar not null,
	"divisor" varchar not null,
	"state" varchar not null,
	"subgroup" varchar not null,
	"time_start" date not null,
	"time_end" date not null,
	"value" float,
	"low" float,
	"high" float
)