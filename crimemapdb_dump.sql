--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2025-01-14 05:39:39

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 82205)
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- TOC entry 5753 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 74002)
-- Name: CrimeTypes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CrimeTypes" (
    "Id" uuid NOT NULL,
    "Title" text NOT NULL,
    "Description" text,
    "Link" text,
    "Color" text
);


ALTER TABLE public."CrimeTypes" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 74028)
-- Name: Crimes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Crimes" (
    "Id" uuid NOT NULL,
    "Applicant" text,
    "TypeId" uuid NOT NULL,
    "WantedPersonId" uuid NOT NULL,
    "Location" text,
    "CreateAt" timestamp with time zone NOT NULL,
    "LawsuitId" uuid,
    "CrimeDate" timestamp with time zone DEFAULT '-infinity'::timestamp with time zone NOT NULL,
    "Point" public.geometry NOT NULL
);


ALTER TABLE public."Crimes" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 74016)
-- Name: Lawsuits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Lawsuits" (
    "Id" uuid NOT NULL,
    "Number" text NOT NULL,
    "ReceiptDate" timestamp with time zone NOT NULL,
    "PersonId" uuid NOT NULL,
    "Judge" text NOT NULL,
    "DecisionDate" timestamp with time zone NOT NULL,
    "Decision" text NOT NULL,
    "EffectiveDate" timestamp with time zone NOT NULL,
    "JudicialActs" text NOT NULL
);


ALTER TABLE public."Lawsuits" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 74009)
-- Name: WantedPersons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."WantedPersons" (
    "Id" uuid NOT NULL,
    "Name" text NOT NULL,
    "Surname" text NOT NULL,
    "Patronymic" text,
    "BirthDate" timestamp with time zone NOT NULL,
    "RegistrationAddress" text,
    "AddInfo" text
);


ALTER TABLE public."WantedPersons" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 57580)
-- Name: __EFMigrationsHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);


ALTER TABLE public."__EFMigrationsHistory" OWNER TO postgres;

--
-- TOC entry 5744 (class 0 OID 74002)
-- Dependencies: 217
-- Data for Name: CrimeTypes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CrimeTypes" ("Id", "Title", "Description", "Link", "Color") FROM stdin;
01943e21-bc4f-7616-b762-175694e57639	Тяжелое увечье	тяжелое преступление, прям да..	https://www.consultant.ru/document/cons_doc_LAW_10699/e7204e825c8e87b5c7be210b06a0cde61cd60a3c/	#ff1fad
01944833-52b7-7460-9adc-bfbe771c8679	Грабеж	Открытое хищение чужого имущества	https://www.consultant.ru/document/cons_doc_LAW_10699/8727611b42df79f2b3ef8d2f3b68fea711ed0c7a/	#2fbbe9
0f5a55fd-ca82-4f00-99c5-3ef13cdd3648	Насилие	\N	https://www.consultant.ru/document/cons_doc_LAW_10699/6b12cdea9308b35504628c3292186f5140f65a68/	#30c54e
8fdfcea4-ddb1-46fd-ad0c-66be6156d550	Убийство	\N	https://www.consultant.ru/document/cons_doc_LAW_10699/5b3e04338020a09b25fe98ea83bc9362c8bc5a76/	#d70f19
9cd0be1a-3952-40c9-a93a-bff647ec85e6	Кража	Незаконное завладение чужим имуществом	https://www.consultant.ru/document/cons_doc_LAW_10699/57b5c7b83fcd2cf40cabe2042f2d8f04ed6875ad/	#a929ff
\.


--
-- TOC entry 5747 (class 0 OID 74028)
-- Dependencies: 220
-- Data for Name: Crimes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Crimes" ("Id", "Applicant", "TypeId", "WantedPersonId", "Location", "CreateAt", "LawsuitId", "CrimeDate", "Point") FROM stdin;
0194628d-c1c3-7e3d-9bad-e254d438ab92		9cd0be1a-3952-40c9-a93a-bff647ec85e6	01942ecf-97ae-7fb6-ab03-81a560a7fe59	Волгодонск, улица Ленина, 73	2025-01-14 05:04:04.876337+03	\N	2025-01-14 03:00:00+03	0101000020E61000006D7629B853144540A8FE7103F4C14740
0194628e-9304-7ab3-8135-48ba17295543		01944833-52b7-7460-9adc-bfbe771c8679	81e9e469-4c14-4f06-8cec-a901240c6ce3	Волгодонск, улица Ленина, 96	2025-01-14 05:04:58.499369+03	\N	2025-01-14 03:00:00+03	0101000020E610000034DF4FBB871445404655E06E99C14740
0194295c-abba-7995-975c-ec940f876871	\N	0f5a55fd-ca82-4f00-99c5-3ef13cdd3648	0194295c-ab01-7f16-9b60-8d186431f90f	ул. Горького	2025-01-03 02:32:06.483077+03	\N	2025-01-03 02:30:55.015+03	0101000020E61000003D47E4BB94945240A54DD53DB2414040
01942960-c240-72bb-b213-7d3299dcfae7	\N	9cd0be1a-3952-40c9-a93a-bff647ec85e6	12654663-c462-44cf-847e-a626d4313b1c	ул. Матросова	2025-01-03 02:36:34.62449+03	\N	2024-11-23 03:00:00+03	0101000020E6100000F83768AF3EAA464034D593F947414040
01942ecf-b49e-7f42-a2f9-0328d51f937c	\N	9cd0be1a-3952-40c9-a93a-bff647ec85e6	01942ecf-97ae-7fb6-ab03-81a560a7fe59	Волгодонск	2025-01-04 03:55:44.114768+03	\N	2024-12-12 03:00:00+03	0101000020E610000034DF4F9D3D134540927DA78075C24740
01942ee5-5663-7eb0-8183-88112337fbd4	\N	9cd0be1a-3952-40c9-a93a-bff647ec85e6	01942ecf-97ae-7fb6-ab03-81a560a7fe59	ВИТИ	2025-01-04 04:19:29.372873+03	\N	2025-01-01 03:00:00+03	0101000020E610000034DF4FDD56144540FB981490FBC14740
01942ee9-8e44-7b25-a69b-8fbae1076b0f	\N	9cd0be1a-3952-40c9-a93a-bff647ec85e6	01942ecf-97ae-7fb6-ab03-81a560a7fe59	Пятерочка	2025-01-04 04:24:05.823636+03	\N	2024-03-03 03:00:00+03	0101000020E610000036DF4FBDB31345408AAAF1F38EC14740
01942eec-5da7-762e-b9c8-6ba499536c14	\N	9cd0be1a-3952-40c9-a93a-bff647ec85e6	01942ecf-97ae-7fb6-ab03-81a560a7fe59	Парк	2025-01-04 04:27:09.986874+03	\N	2023-12-12 03:00:00+03	0101000020E610000035DF4F05A7144540D0D50F3439C14740
01942eee-fd77-70f2-b954-b275077f16e2	\N	9cd0be1a-3952-40c9-a93a-bff647ec85e6	01942ecf-97ae-7fb6-ab03-81a560a7fe59	Магазин	2025-01-04 04:30:01.970063+03	\N	2025-01-03 03:00:00+03	0101000020E610000035DF4F7DF4124540DD97BAFE06C24740
01942eef-c2f0-7c63-a9f0-f7f059c5da18	\N	9cd0be1a-3952-40c9-a93a-bff647ec85e6	01942ecf-97ae-7fb6-ab03-81a560a7fe59	Кино	2025-01-04 04:30:52.522927+03	\N	2024-12-31 03:00:00+03	0101000020E610000054E6220991184540A1072EED4DC24740
01943917-5a95-7c9e-9d22-40c9f9672102	\N	0f5a55fd-ca82-4f00-99c5-3ef13cdd3648	81e9e469-4c14-4f06-8cec-a901240c6ce3	Рынок	2025-01-06 03:50:19.404516+03	\N	2023-12-12 03:00:00+03	0101000020E610000033DF4FDDA5104540C0B38CA40DC84740
0194392b-8d91-7214-85db-6f395c6bfdf7	\N	8fdfcea4-ddb1-46fd-ad0c-66be6156d550	01942ecf-97ae-7fb6-ab03-81a560a7fe59	Поля	2025-01-06 04:12:23.185417+03	\N	2024-12-12 03:00:00+03	0101000020E61000006B9F52EDEB0F4540791DF0F579C14740
\.


--
-- TOC entry 5746 (class 0 OID 74016)
-- Dependencies: 219
-- Data for Name: Lawsuits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Lawsuits" ("Id", "Number", "ReceiptDate", "PersonId", "Judge", "DecisionDate", "Decision", "EffectiveDate", "JudicialActs") FROM stdin;
\.


--
-- TOC entry 5745 (class 0 OID 74009)
-- Dependencies: 218
-- Data for Name: WantedPersons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."WantedPersons" ("Id", "Name", "Surname", "Patronymic", "BirthDate", "RegistrationAddress", "AddInfo") FROM stdin;
81e9e469-4c14-4f06-8cec-a901240c6ce3	Иван	Иванов	\N	2000-01-01 03:00:00+03	\N	\N
7f4f062f-8da3-47e6-b8be-4759e48edb9b	Екатерина	Иванова	\N	1999-12-01 03:00:00+03	\N	\N
0194295c-ab01-7f16-9b60-8d186431f90f	Иван	Иванов	Иванович	1984-01-10 03:00:00+03	\N	Преступник, подозревается в краже
01942ecf-97ae-7fb6-ab03-81a560a7fe59	Евгений	Терехов	Игоревич	2005-12-12 03:00:00+03	Турция	Особо опасен
345e254f-7869-4d1a-bbd1-bee9fc0b5102	Егор	Верин	\N	1984-10-08 03:00:00+03	\N	\N
3559cdf1-e821-484a-aa10-83962847d6c1	Сергей	Петров	\N	2000-12-21 03:00:00+03	\N	Подозревается в грабежах
12654663-c462-44cf-847e-a626d4313b1c	Василий	Васильев	\N	1965-01-02 03:00:00+03	\N	Разыскивается за мошенничество
\.


--
-- TOC entry 5743 (class 0 OID 57580)
-- Dependencies: 216
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
20241202211243_InitMigration	8.0.11
20241202212210_AddCreateDate	8.0.11
20241209213930_MinimalData	8.0.11
20241209214151_MinDataAndSetNull	8.0.11
20241209220600_DateTimeWithoutTimeZone	8.0.11
20241209222708_DateTimeWithTimeZone	8.0.11
20241221232611_RenamePointAndCreateDate	8.0.11
20241221234449_RenamePointAndChangeIdType	8.0.11
20241221234934_RenamePointAndChangeIdType	8.0.11
20241221235734_AddIdRelashionshipsAndLawsuits	8.0.11
20241221235950_DelPointId	8.0.11
20241222003947_AddCrimeDate	8.0.11
20250101215144_ChangePointTypeToDecimal	9.0.0
20250108215455_AddCrimeTypeLinkColumn	9.0.0
20250111221841_AddColorCrimeType	9.0.0
20250112214201_ChangePlaceLongitudeAndLatitude	9.0.0
20250114011638_RenamePointMe	9.0.0
20250114012859_AddGeoPointColumnToCrime	9.0.0
20250114012956_AddGeoPointColumnToCrime2	9.0.0
20250114013111_AddGeoPointColumnToCrime3	9.0.0
20250114013418_AddGeoPointColumnToCrime4	9.0.0
20250114014741_AddGeoPointColumnToCrime6	9.0.0
20250114020218_AddGeoPointColumnToCrimeUpdate	9.0.0
\.


--
-- TOC entry 5572 (class 0 OID 82523)
-- Dependencies: 222
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- TOC entry 5578 (class 2606 OID 74008)
-- Name: CrimeTypes PK_CrimeTypes; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CrimeTypes"
    ADD CONSTRAINT "PK_CrimeTypes" PRIMARY KEY ("Id");


--
-- TOC entry 5588 (class 2606 OID 74034)
-- Name: Crimes PK_Crimes; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Crimes"
    ADD CONSTRAINT "PK_Crimes" PRIMARY KEY ("Id");


--
-- TOC entry 5583 (class 2606 OID 74022)
-- Name: Lawsuits PK_Lawsuits; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lawsuits"
    ADD CONSTRAINT "PK_Lawsuits" PRIMARY KEY ("Id");


--
-- TOC entry 5580 (class 2606 OID 74015)
-- Name: WantedPersons PK_WantedPersons; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WantedPersons"
    ADD CONSTRAINT "PK_WantedPersons" PRIMARY KEY ("Id");


--
-- TOC entry 5576 (class 2606 OID 57584)
-- Name: __EFMigrationsHistory PK___EFMigrationsHistory; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");


--
-- TOC entry 5584 (class 1259 OID 74050)
-- Name: IX_Crimes_LawsuitId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Crimes_LawsuitId" ON public."Crimes" USING btree ("LawsuitId");


--
-- TOC entry 5585 (class 1259 OID 74051)
-- Name: IX_Crimes_TypeId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Crimes_TypeId" ON public."Crimes" USING btree ("TypeId");


--
-- TOC entry 5586 (class 1259 OID 74052)
-- Name: IX_Crimes_WantedPersonId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Crimes_WantedPersonId" ON public."Crimes" USING btree ("WantedPersonId");


--
-- TOC entry 5581 (class 1259 OID 74053)
-- Name: IX_Lawsuits_PersonId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Lawsuits_PersonId" ON public."Lawsuits" USING btree ("PersonId");


--
-- TOC entry 5592 (class 2606 OID 74035)
-- Name: Crimes FK_Crimes_CrimeTypes_TypeId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Crimes"
    ADD CONSTRAINT "FK_Crimes_CrimeTypes_TypeId" FOREIGN KEY ("TypeId") REFERENCES public."CrimeTypes"("Id") ON DELETE CASCADE;


--
-- TOC entry 5593 (class 2606 OID 74040)
-- Name: Crimes FK_Crimes_Lawsuits_LawsuitId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Crimes"
    ADD CONSTRAINT "FK_Crimes_Lawsuits_LawsuitId" FOREIGN KEY ("LawsuitId") REFERENCES public."Lawsuits"("Id");


--
-- TOC entry 5594 (class 2606 OID 74045)
-- Name: Crimes FK_Crimes_WantedPersons_WantedPersonId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Crimes"
    ADD CONSTRAINT "FK_Crimes_WantedPersons_WantedPersonId" FOREIGN KEY ("WantedPersonId") REFERENCES public."WantedPersons"("Id") ON DELETE CASCADE;


--
-- TOC entry 5591 (class 2606 OID 74023)
-- Name: Lawsuits FK_Lawsuits_WantedPersons_PersonId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lawsuits"
    ADD CONSTRAINT "FK_Lawsuits_WantedPersons_PersonId" FOREIGN KEY ("PersonId") REFERENCES public."WantedPersons"("Id") ON DELETE CASCADE;


-- Completed on 2025-01-14 05:39:39

--
-- PostgreSQL database dump complete
--

