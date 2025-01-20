--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2025-01-20 21:23:15

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
    "WantedPersonId" uuid,
    "Location" text,
    "CreateAt" timestamp with time zone NOT NULL,
    "LawsuitId" uuid,
    "CrimeDate" timestamp with time zone DEFAULT '-infinity'::timestamp with time zone NOT NULL,
    "Point" public.geometry NOT NULL,
    "Description" text
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
01944833-52b7-7460-9adc-bfbe771c8679	Грабеж	Открытое хищение чужого имущества	https://www.consultant.ru/document/cons_doc_LAW_10699/8727611b42df79f2b3ef8d2f3b68fea711ed0c7a/	#2fbbe9
0f5a55fd-ca82-4f00-99c5-3ef13cdd3648	Насилие	\N	https://www.consultant.ru/document/cons_doc_LAW_10699/6b12cdea9308b35504628c3292186f5140f65a68/	#30c54e
8fdfcea4-ddb1-46fd-ad0c-66be6156d550	Убийство	\N	https://www.consultant.ru/document/cons_doc_LAW_10699/5b3e04338020a09b25fe98ea83bc9362c8bc5a76/	#d70f19
9cd0be1a-3952-40c9-a93a-bff647ec85e6	Кража	Незаконное завладение чужим имуществом	https://www.consultant.ru/document/cons_doc_LAW_10699/57b5c7b83fcd2cf40cabe2042f2d8f04ed6875ad/	#a929ff
01943e21-bc4f-7616-b762-175694e57639	Тяжелое увечье	тяжелое преступление, прям дас	https://www.consultant.ru/document/cons_doc_LAW_10699/e7204e825c8e87b5c7be210b06a0cde61cd60a3c/	#ff00f7
\.


--
-- TOC entry 5747 (class 0 OID 74028)
-- Dependencies: 220
-- Data for Name: Crimes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Crimes" ("Id", "Applicant", "TypeId", "WantedPersonId", "Location", "CreateAt", "LawsuitId", "CrimeDate", "Point", "Description") FROM stdin;
01942ecf-b49e-7f42-a2f9-0328d51f937c	\N	9cd0be1a-3952-40c9-a93a-bff647ec85e6	01942ecf-97ae-7fb6-ab03-81a560a7fe59	Волгодонск	2025-01-04 03:55:44.114768+03	\N	2024-12-12 03:00:00+03	0101000020E610000034DF4F9D3D134540927DA78075C24740	\N
01942ee9-8e44-7b25-a69b-8fbae1076b0f	\N	9cd0be1a-3952-40c9-a93a-bff647ec85e6	01942ecf-97ae-7fb6-ab03-81a560a7fe59	Пятерочка	2025-01-04 04:24:05.823636+03	\N	2024-03-03 03:00:00+03	0101000020E610000036DF4FBDB31345408AAAF1F38EC14740	\N
01942eef-c2f0-7c63-a9f0-f7f059c5da18	\N	9cd0be1a-3952-40c9-a93a-bff647ec85e6	01942ecf-97ae-7fb6-ab03-81a560a7fe59	Кино	2025-01-04 04:30:52.522927+03	\N	2024-12-31 03:00:00+03	0101000020E610000054E6220991184540A1072EED4DC24740	\N
01946b8b-a409-7d28-b2a5-7d31bd32f127		01944833-52b7-7460-9adc-bfbe771c8679	12654663-c462-44cf-847e-a626d4313b1c	Волгодонск, Советская улица, 87	2025-01-15 22:58:21.193013+03	\N	2025-01-15 03:00:00+03	0101000020E610000035DF4F1B281445403826660F71C14740	\N
01946b98-35b4-744e-9eac-1c5155ee91c2		8fdfcea4-ddb1-46fd-ad0c-66be6156d550	7f4f062f-8da3-47e6-b8be-4759e48edb9b	Волгодонск, Вокзальный переулок	2025-01-15 23:12:04.888677+03	\N	2025-01-15 03:00:00+03	0101000020E610000031DF8FB3F5134540CDB982CABBC14740	\N
01946ba3-b3c1-7abf-a501-d1973523e79d		01943e21-bc4f-7616-b762-175694e57639	81e9e469-4c14-4f06-8cec-a901240c6ce3	Волгодонск, улица Ленина, 52	2025-01-15 23:24:38.053765+03	\N	2025-01-15 03:00:00+03	0101000020E610000078DDBF123D134540A669030E71C24740	\N
01946c31-13b0-7edf-ae0d-6380a06d834d		01944833-52b7-7460-9adc-bfbe771c8679	01942ecf-97ae-7fb6-ab03-81a560a7fe59	Волгодонск, улица Максима Горького	2025-01-16 01:59:03.215616+03	\N	2025-01-15 03:00:00+03	0101000020E6100000D396055757134540B78D48C49AC14740	\N
01947614-85f9-7e23-98b3-8b36d167aa68		0f5a55fd-ca82-4f00-99c5-3ef13cdd3648	0194295c-ab01-7f16-9b60-8d186431f90f	Волгодонск, улица Ленина, 122	2025-01-18 00:04:04.071264+03	\N	2025-01-17 03:00:00+03	0101000020E6100000B17336B0981545407D950ABDB5C04740	\N
01947632-15a0-7d27-97b9-423e3e18463e		0f5a55fd-ca82-4f00-99c5-3ef13cdd3648	81e9e469-4c14-4f06-8cec-a901240c6ce3	Волгодонск, улица 2-я Линия, 56	2025-01-18 00:36:26.527591+03	\N	2023-12-12 03:00:00+03	0101000020E6100000DD635191A8104540B0A2BF5709C84740	\N
01947fe8-7fe0-7931-97b8-4848b5493960		01944833-52b7-7460-9adc-bfbe771c8679	81e9e469-4c14-4f06-8cec-a901240c6ce3	Волгодонск, улица Ленина, 88	2025-01-19 21:59:14.449614+03	\N	2025-01-19 03:00:00+03	0101000020E610000009F3BF6D2514454015B70DF6D6C14740	\N
01946b8b-4e14-7736-afe8-a92d293e058a		01943e21-bc4f-7616-b762-175694e57639	\N	Волгодонск, Вокзальный переулок, 56	2025-01-19 21:59:33.793772+03	\N	2025-01-15 03:00:00+03	0101000020E610000033DF4FFCFB134540C25744BBBBC14740	\N
01947632-8d66-7b13-a8a9-3f4ffdd6dd5d		9cd0be1a-3952-40c9-a93a-bff647ec85e6	01942ecf-97ae-7fb6-ab03-81a560a7fe59	Волгодонск, улица Ленина, 73	2025-01-19 22:01:13.453255+03	\N	2025-01-17 03:00:00+03	0101000020E6100000A3C6D01B561445408E3859BAF6C14740	\N
0194392b-8d91-7214-85db-6f395c6bfdf7		8fdfcea4-ddb1-46fd-ad0c-66be6156d550	01942ecf-97ae-7fb6-ab03-81a560a7fe59	Поля	2025-01-20 04:37:16.268555+03	\N	2024-12-12 03:00:00+03	0101000020E61000006B9F52EDEB0F4540791DF0F579C14740	Улитку пострадала
0194815c-4928-7541-a36a-32d0d5c663f4		9cd0be1a-3952-40c9-a93a-bff647ec85e6	01942ecf-97ae-7fb6-ab03-81a560a7fe59	Волгодонск, улица Ленина, 88	2025-01-20 04:38:16.487867+03	\N	2025-01-20 03:00:00+03	0101000020E6100000D9A3A08025144540F9B761B6D9C14740	Украл чайный пакетик
01948155-4d30-769a-914a-f0caaded461a		01944833-52b7-7460-9adc-bfbe771c8679	\N	Волгодонск, улица Думенко, 2	2025-01-20 04:30:38.754412+03	\N	2025-01-19 03:00:00+03	0101000020E610000044EAA8C011134540199C213568C24740	Ограбление магазина, оставлены опечатки
019484e7-5340-7427-a6fa-6de20a1569cd		01944833-52b7-7460-9adc-bfbe771c8679	\N	Волгодонск, Советская улица, 47	2025-01-20 21:09:00.168401+03	\N	2025-01-20 03:00:00+03	0101000020E610000035DF4F87DB1245400E319F5A5FC24740	Жестко
01946c30-f69d-752b-a672-7487ed549724		01943e21-bc4f-7616-b762-175694e57639	81e9e469-4c14-4f06-8cec-a901240c6ce3	Волгодонск, улица Думенко, 1	2025-01-20 04:36:26.702016+03	\N	2025-01-15 03:00:00+03	0101000020E6100000D1960543A81245404FF4F5573AC24740	Было очень прям очень темно Было очень прям очень темно Было очень прям очень темно\nБыло очень прям очень темно Было очень прям очень темно Было очень прям очень темно\nБыло очень прям очень темно Было очень прям очень темно Было очень прям очень темно\n
0194802c-d957-7633-bc78-39be19c0b5f9		8fdfcea4-ddb1-46fd-ad0c-66be6156d550	\N	Волгодонск, улица 50 лет ВЛКСМ, 10	2025-01-19 23:06:50.238302+03	\N	2025-01-16 03:00:00+03	0101000020E61000009BA2698B9A134540DF8AC486CFC14740	\N
019484f0-50d4-7ef0-a687-3575abb1a9a8		9cd0be1a-3952-40c9-a93a-bff647ec85e6	\N	Волгодонск, Морская улица, 64	2025-01-20 21:18:49.367433+03	\N	2025-01-20 03:00:00+03	0101000020E61000008C736EF7A0134540564830EF9FC24740	Вот так
019484f1-6994-752e-8616-59ae57568693		8fdfcea4-ddb1-46fd-ad0c-66be6156d550	019484f1-a1c3-76fb-86f8-2d883c79df10	Волгодонск, улица Максима Горького, 77А	2025-01-20 21:20:15.680969+03	\N	2025-01-20 03:00:00+03	0101000020E610000035DF4FEFDC124540B6700DCDFBC14740	
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
019484f1-a1c3-76fb-86f8-2d883c79df10	Алексей	Попов	Васильевич	2003-12-12 03:00:00+03	\N	\N
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
20250119180302_WantedPersonSetNull	9.0.1
20250120011811_AddCrimeDescription	9.0.1
20250120181644_WantedPersonOnDeleteSetNull	9.0.1
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
-- TOC entry 5594 (class 2606 OID 90384)
-- Name: Crimes FK_Crimes_WantedPersons_WantedPersonId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Crimes"
    ADD CONSTRAINT "FK_Crimes_WantedPersons_WantedPersonId" FOREIGN KEY ("WantedPersonId") REFERENCES public."WantedPersons"("Id") ON DELETE SET NULL;


--
-- TOC entry 5591 (class 2606 OID 74023)
-- Name: Lawsuits FK_Lawsuits_WantedPersons_PersonId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lawsuits"
    ADD CONSTRAINT "FK_Lawsuits_WantedPersons_PersonId" FOREIGN KEY ("PersonId") REFERENCES public."WantedPersons"("Id") ON DELETE CASCADE;


-- Completed on 2025-01-20 21:23:17

--
-- PostgreSQL database dump complete
--

