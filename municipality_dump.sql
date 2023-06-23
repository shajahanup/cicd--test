CREATE TABLE public.municipality (
	id serial4 NOT NULL,
	created_by int8 NULL,
	"name" varchar(64) NOT NULL,
	total_area varchar(32) NOT NULL,
	zip_code varchar(5) NOT NULL,
	district varchar(32) NOT NULL,
	address_book_last_updated time NOT NULL,
	events_last_updated time NOT NULL,
	news_last_updated time NOT NULL,
	offerslast_updated time NOT NULL,
	admin_last_updated time NOT NULL,
	mayor_last_updated time NOT NULL,
	is_deleted bool NULL DEFAULT false,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	CONSTRAINT municipality_pkey PRIMARY KEY (id),
	CONSTRAINT municipality_zip_code_key UNIQUE (zip_code)
);

-- public.mayor definition

-- Drop table

-- DROP TABLE public.mayor;

CREATE TABLE public.mayor (
	id serial4 NOT NULL,
	municipality_id int4 NULL,
	"name" varchar(32) NOT NULL,
	img_name varchar(128) NULL DEFAULT ''::character varying,
	introduction text NOT NULL,
	designation varchar(64) NOT NULL,
	phone varchar(15) NOT NULL,
	fax varchar(15) NOT NULL,
	email varchar(64) NOT NULL,
	address varchar(64) NOT NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	timing jsonb NULL,
	CONSTRAINT mayor_pkey PRIMARY KEY (id)
);
ALTER TABLE public.mayor ADD CONSTRAINT mayor_municipality_id_fkey FOREIGN KEY (municipality_id) REFERENCES public.municipality(id);

-- public."admin" definition

-- Drop table

-- DROP TABLE public."admin";

CREATE TABLE public."admin" (
	id serial4 NOT NULL,
	"name" varchar(255) NULL,
	email varchar(255) NULL,
	"password" varchar(255) NULL,
	is_deleted bool NULL,
	fp_token varchar(24) NULL,
	fp_duration timestamptz NULL,
	created_by int8 NULL,
	updated_by int8 NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	CONSTRAINT admin_email_key UNIQUE (email),
	CONSTRAINT admin_pkey PRIMARY KEY (id),
	CONSTRAINT admin_created_by_fkey FOREIGN KEY (created_by) REFERENCES public."admin"(id),
	CONSTRAINT admin_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public."admin"(id)
);

-- public.address_book_category definition

-- Drop table

-- DROP TABLE public.address_book_category;

CREATE TABLE public.address_book_category (
	id serial4 NOT NULL,
	municipality_id int8 NULL,
	"name" varchar(255) NULL,
	created_by int8 NULL,
	is_deleted bool NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	CONSTRAINT address_book_category_pkey PRIMARY KEY (id)
);


-- public.address_book_category foreign keys

ALTER TABLE public.address_book_category ADD CONSTRAINT address_book_category_municipality_id_fkey FOREIGN KEY (municipality_id) REFERENCES public.municipality(id);

-- public.address_book definition

-- Drop table

-- DROP TABLE public.address_book;

CREATE TABLE public.address_book (
	id serial4 NOT NULL,
	municipality_id int8 NULL,
	category_id int8 NULL,
	"name" varchar(255) NULL,
	work_time jsonb NULL,
	"location" point NULL,
	phone varchar(15) NULL,
	created_by int8 NULL,
	is_deleted bool NULL DEFAULT false,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	address varchar(512) NULL,
	CONSTRAINT address_book_pkey PRIMARY KEY (id)
);


-- public.address_book foreign keys

ALTER TABLE public.address_book ADD CONSTRAINT address_book_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.address_book_category(id);
ALTER TABLE public.address_book ADD CONSTRAINT address_book_created_by_fkey FOREIGN KEY (created_by) REFERENCES public."admin"(id);
ALTER TABLE public.address_book ADD CONSTRAINT address_book_municipality_id_fkey FOREIGN KEY (municipality_id) REFERENCES public.municipality(id);

-- public.events definition

-- Drop table

-- DROP TABLE public.events;

CREATE TABLE public.events (
	id serial4 NOT NULL,
	municipality_id int8 NULL,
	date_time timestamptz NULL,
	title varchar(128) NOT NULL,
	"location" point NOT NULL,
	created_by int8 NULL,
	is_deleted bool NULL DEFAULT false,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	note varchar(128) NULL,
	CONSTRAINT events_pkey PRIMARY KEY (id)
);


-- public.events foreign keys

ALTER TABLE public.events ADD CONSTRAINT events_created_by_fkey FOREIGN KEY (created_by) REFERENCES public."admin"(id);
ALTER TABLE public.events ADD CONSTRAINT events_municipality_id_fkey FOREIGN KEY (municipality_id) REFERENCES public.municipality(id);

-- public.news definition

-- Drop table

-- DROP TABLE public.news;

CREATE TABLE public.news (
	id serial4 NOT NULL,
	municipality_id int8 NULL,
	title varchar(255) NULL,
	"content" text NULL,
	"date" timestamptz NULL,
	"type" int4 NULL,
	created_by int8 NULL,
	is_deleted bool NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	img_name varchar(255) NULL,
	CONSTRAINT news_pkey PRIMARY KEY (id)
);


-- public.news foreign keys

ALTER TABLE public.news ADD CONSTRAINT news_municipality_id_fkey FOREIGN KEY (municipality_id) REFERENCES public.municipality(id);


-- public.offers definition

-- Drop table

-- DROP TABLE public.offers;

CREATE TABLE public.offers (
	id serial4 NOT NULL,
	municipality_id int8 NULL,
	establishment varchar(255) NULL,
	phone varchar(15) NULL,
	website varchar(255) NULL,
	img_name varchar(255) NULL,
	thumb_url varchar(255) NULL,
	address varchar(255) NULL,
	"location" point NULL,
	begins_on timestamptz NULL,
	expiry_on timestamptz NULL,
	created_by int8 NULL,
	is_deleted bool NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	description varchar(256) NULL,
	CONSTRAINT offers_pkey PRIMARY KEY (id)
);


-- public.offers foreign keys

ALTER TABLE public.offers ADD CONSTRAINT offers_created_by_fkey FOREIGN KEY (created_by) REFERENCES public."admin"(id);
ALTER TABLE public.offers ADD CONSTRAINT offers_municipality_id_fkey FOREIGN KEY (municipality_id) REFERENCES public.municipality(id);

INSERT INTO public."admin" ("name",email,"password",is_deleted,fp_token,fp_duration,created_by,updated_by,created_at,updated_at) VALUES
	 ('Admin','admin@simplogics.com','$2b$10$dUWzEgsOA.6NEh.dK/HDZuUOVPobCAByhxh79idycCi.NwaOBkKR.',false,NULL,NULL,NULL,NULL,'2022-11-10 16:27:33.994','2022-11-10 16:27:33.994'),
	 ('Municipality Admin','madmin@simplogics.com','$2b$10$dUWzEgsOA.6NEh.dK/HDZuUOVPobCAByhxh79idycCi.NwaOBkKR.',NULL,NULL,NULL,NULL,NULL,'2022-11-10 16:27:33.994','2022-11-10 16:27:33.994'),
	 ('Super Admin','sa@simplogics.com','$2b$10$dUWzEgsOA.6NEh.dK/HDZuUOVPobCAByhxh79idycCi.NwaOBkKR.',false,'',NULL,NULL,NULL,'2022-11-10 16:27:33.994','2022-11-10 16:27:33.994');

INSERT INTO public.municipality (created_by,"name",total_area,zip_code,district,address_book_last_updated,events_last_updated,news_last_updated,offerslast_updated,admin_last_updated,mayor_last_updated,is_deleted,created_at,updated_at) VALUES
	 (1,'Municipality of Wald','38','93192','Wald','09:30:20','09:30:20','09:30:20','09:30:20','09:30:20','09:30:20',false,'2017-03-31 09:30:20.000','2017-03-31 09:30:20.000');

INSERT INTO public.mayor (municipality_id,"name",img_name,introduction,designation,phone,fax,email,address,created_at,updated_at,timing) VALUES
	 (1,'Barbara Haimerl','','im Namen der Gemeinde Wald, des Gemeinderates und der Verwaltung darf ich Sie sehr herzlich bei uns begrüßen. Unsere Internetseite soll Ihnen unsere schöne Gemeinde vorstellen und Sie über wichtige Einrichtungen und Aktivitäten informieren. Sie werden feststellen, dass die Gemeinde Wald viel zu bieten hat. Das Internet soll informieren und erleichtern, ohne dass der persönliche Kontakt zu unseren Bürgerinnen und Bürgern verloren geht. Auf unserer Seite und auf der Seite der Verwaltungsgemeinschaft finden Sie unsere Mitarbeiter sowie den entsprechenden Aufgabenbereich, ihre Durchwahltelefonnummern, E-Mail-Adressen und weitere Informationen.','Erste Bürgermeisterin, Kreisrätin','0946384040','094638404-119','poststelle@vg-wald.de','Hauptstraße 1493192 Wald ','2017-07-23 13:10:11.000','2022-11-24 19:33:38.040','[{"weeks": [], "endTime": null, "startTime": null}]');

INSERT INTO public.address_book_category (municipality_id,"name",created_by,is_deleted,created_at,updated_at) VALUES
	 (1,'Zemlak LLC',1,NULL,'2022-06-27 00:00:00.000','2022-02-23 00:00:00.000'),
	 (1,'Oberbrunner LLC',1,NULL,'2022-03-13 00:00:00.000','2021-12-05 00:00:00.000'),
	 (1,'Langworth, Will and Champlin',1,NULL,'2022-09-16 00:00:00.000','2022-04-10 00:00:00.000'),
	 (1,'Treutel Inc',1,NULL,'2022-10-16 00:00:00.000','2022-01-09 00:00:00.000'),
	 (1,'Considine and Sons',1,NULL,'2022-10-04 00:00:00.000','2022-03-19 00:00:00.000'),
	 (1,'Berge, VonRueden and Spinka',1,NULL,'2021-12-27 00:00:00.000','2022-10-23 00:00:00.000'),
	 (1,'O''Connell-DuBuque',1,NULL,'2022-01-29 00:00:00.000','2022-08-27 00:00:00.000'),
	 (1,'Kertzmann, Feest and Toy',1,NULL,'2021-12-15 00:00:00.000','2022-05-28 00:00:00.000'),
	 (1,'Gottlieb-Ritchie',1,NULL,'2022-09-20 00:00:00.000','2022-07-13 00:00:00.000'),
	 (1,'McLaughlin LLC',1,NULL,'2022-08-23 00:00:00.000','2022-06-10 00:00:00.000');
INSERT INTO public.address_book_category (municipality_id,"name",created_by,is_deleted,created_at,updated_at) VALUES
	 (1,'Russel-Gottlieb',1,NULL,'2022-06-06 00:00:00.000','2021-12-03 00:00:00.000'),
	 (1,'Armstrong and Sons',1,NULL,'2021-11-16 00:00:00.000','2022-08-20 00:00:00.000'),
	 (1,'Ernser, Dare and Jast',1,NULL,'2022-03-23 00:00:00.000','2022-04-26 00:00:00.000'),
	 (1,'Jacobson-Mohr',1,NULL,'2022-10-31 00:00:00.000','2022-08-30 00:00:00.000'),
	 (1,'Shanahan, Farrell and Ondricka',1,NULL,'2022-03-11 00:00:00.000','2021-12-22 00:00:00.000'),
	 (1,'Pagac-Greenholt',1,NULL,'2022-06-05 00:00:00.000','2022-02-06 00:00:00.000'),
	 (1,'Reinger-Wunsch',1,NULL,'2022-01-30 00:00:00.000','2022-08-23 00:00:00.000'),
	 (1,'Wintheiser LLC',1,NULL,'2022-02-16 00:00:00.000','2022-08-01 00:00:00.000'),
	 (1,'Mante Group',1,NULL,'2022-07-28 00:00:00.000','2022-05-13 00:00:00.000'),
	 (1,'Waelchi, Block and Wiegand',1,NULL,'2022-08-05 00:00:00.000','2022-06-15 00:00:00.000');
INSERT INTO public.address_book_category (municipality_id,"name",created_by,is_deleted,created_at,updated_at) VALUES
	 (1,'Donnelly, Sauer and Boyer',1,NULL,'2022-08-05 00:00:00.000','2021-12-09 00:00:00.000'),
	 (1,'Jacobi, Jerde and Koch',1,NULL,'2022-05-25 00:00:00.000','2022-09-28 00:00:00.000'),
	 (1,'Wisoky-Towne',1,NULL,'2022-01-30 00:00:00.000','2022-01-20 00:00:00.000'),
	 (1,'Parker Group',1,NULL,'2022-10-18 00:00:00.000','2022-11-05 00:00:00.000'),
	 (1,'Wiza, Hilll and Prosacco',1,NULL,'2022-05-01 00:00:00.000','2022-08-22 00:00:00.000'),
	 (1,'Schowalter-Rau',1,NULL,'2022-09-22 00:00:00.000','2022-06-14 00:00:00.000');
