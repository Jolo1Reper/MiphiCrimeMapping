--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2025-01-03 02:42:00

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 74002)
-- Name: CrimeTypes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CrimeTypes" (
    "Id" uuid NOT NULL,
    "Title" text NOT NULL,
    "Description" text
);


ALTER TABLE public."CrimeTypes" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 74028)
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
    "Point_Latitude" numeric NOT NULL,
    "Point_Longitude" numeric NOT NULL,
    "CrimeDate" timestamp with time zone DEFAULT '-infinity'::timestamp with time zone NOT NULL
);


ALTER TABLE public."Crimes" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 74016)
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
-- TOC entry 217 (class 1259 OID 74009)
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
-- TOC entry 215 (class 1259 OID 57580)
-- Name: __EFMigrationsHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);


ALTER TABLE public."__EFMigrationsHistory" OWNER TO postgres;

--
-- TOC entry 4812 (class 0 OID 74002)
-- Dependencies: 216
-- Data for Name: CrimeTypes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CrimeTypes" ("Id", "Title", "Description") FROM stdin;
0f5a55fd-ca82-4f00-99c5-3ef13cdd3648	насилие	\N
9cd0be1a-3952-40c9-a93a-bff647ec85e6	кража	\N
a8af18d1-9a18-4739-9cbf-69e1fac3c329	ограбление	\N
8fdfcea4-ddb1-46fd-ad0c-66be6156d550	убийство	\N
\.


--
-- TOC entry 4815 (class 0 OID 74028)
-- Dependencies: 219
-- Data for Name: Crimes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Crimes" ("Id", "Applicant", "TypeId", "WantedPersonId", "Location", "CreateAt", "LawsuitId", "Point_Latitude", "Point_Longitude", "CrimeDate") FROM stdin;
0194295c-abba-7995-975c-ec940f876871		0f5a55fd-ca82-4f00-99c5-3ef13cdd3648	0194295c-ab01-7f16-9b60-8d186431f90f	ул. Горького	2025-01-03 02:32:06.483077+03	\N	32.513252	74.321578	2025-01-03 02:30:55.015+03
0194295d-9925-76f3-9bcb-5ef00bafa218		a8af18d1-9a18-4739-9cbf-69e1fac3c329	0194295c-ab01-7f16-9b60-8d186431f90f	ул. Морская	2025-01-03 02:33:07.48584+03	\N	33.515299	67.749538	2024-12-31 03:00:00+03
0194295f-85bc-74c7-9f48-3c16043fce55		0f5a55fd-ca82-4f00-99c5-3ef13cdd3648	3559cdf1-e821-484a-aa10-83962847d6c1	ул. Московская	2025-01-03 02:35:13.595787+03	\N	44.515299	38.333538	2024-10-05 03:00:00+03
01942960-c240-72bb-b213-7d3299dcfae7		9cd0be1a-3952-40c9-a93a-bff647ec85e6	12654663-c462-44cf-847e-a626d4313b1c	ул. Матросова	2025-01-03 02:36:34.62449+03	\N	32.510009	45.330038	2024-11-23 03:00:00+03
01942963-c7b9-756a-9276-61da270ca0af		a8af18d1-9a18-4739-9cbf-69e1fac3c329	345e254f-7869-4d1a-bbd1-bee9fc0b5102	ул. Висока	2025-01-03 02:39:51.217515+03	\N	33.510009	40.330038	2024-11-23 03:00:00+03
\.


--
-- TOC entry 4814 (class 0 OID 74016)
-- Dependencies: 218
-- Data for Name: Lawsuits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Lawsuits" ("Id", "Number", "ReceiptDate", "PersonId", "Judge", "DecisionDate", "Decision", "EffectiveDate", "JudicialActs") FROM stdin;
\.


--
-- TOC entry 4813 (class 0 OID 74009)
-- Dependencies: 217
-- Data for Name: WantedPersons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."WantedPersons" ("Id", "Name", "Surname", "Patronymic", "BirthDate", "RegistrationAddress", "AddInfo") FROM stdin;
3559cdf1-e821-484a-aa10-83962847d6c1	Сергей	Петров	\N	2000-12-21 03:00:00+03	\N	\N
345e254f-7869-4d1a-bbd1-bee9fc0b5102	Егор	Верин	\N	1984-10-04 03:00:00+03	\N	\N
7f4f062f-8da3-47e6-b8be-4759e48edb9b	Иван	Иванов	\N	1999-01-01 03:00:00+03	\N	\N
81e9e469-4c14-4f06-8cec-a901240c6ce3	Иван	Иванов	\N	2000-01-01 03:00:00+03	\N	\N
12654663-c462-44cf-847e-a626d4313b1c	Василий	Васильев	\N	1965-01-02 03:00:00+03	\N	\N
019424ab-4a2d-7839-9e66-3d2b153b01a4	Виктор	Миронов	\N	1988-02-13 03:00:00+03	\N	\N
0194295c-ab01-7f16-9b60-8d186431f90f	Иван	Иванов	\N	1984-01-10 03:00:00+03	\N	\N
\.


--
-- TOC entry 4811 (class 0 OID 57580)
-- Dependencies: 215
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
\.


--
-- TOC entry 4653 (class 2606 OID 74008)
-- Name: CrimeTypes PK_CrimeTypes; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CrimeTypes"
    ADD CONSTRAINT "PK_CrimeTypes" PRIMARY KEY ("Id");


--
-- TOC entry 4663 (class 2606 OID 74034)
-- Name: Crimes PK_Crimes; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Crimes"
    ADD CONSTRAINT "PK_Crimes" PRIMARY KEY ("Id");


--
-- TOC entry 4658 (class 2606 OID 74022)
-- Name: Lawsuits PK_Lawsuits; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lawsuits"
    ADD CONSTRAINT "PK_Lawsuits" PRIMARY KEY ("Id");


--
-- TOC entry 4655 (class 2606 OID 74015)
-- Name: WantedPersons PK_WantedPersons; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WantedPersons"
    ADD CONSTRAINT "PK_WantedPersons" PRIMARY KEY ("Id");


--
-- TOC entry 4651 (class 2606 OID 57584)
-- Name: __EFMigrationsHistory PK___EFMigrationsHistory; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");


--
-- TOC entry 4659 (class 1259 OID 74050)
-- Name: IX_Crimes_LawsuitId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Crimes_LawsuitId" ON public."Crimes" USING btree ("LawsuitId");


--
-- TOC entry 4660 (class 1259 OID 74051)
-- Name: IX_Crimes_TypeId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Crimes_TypeId" ON public."Crimes" USING btree ("TypeId");


--
-- TOC entry 4661 (class 1259 OID 74052)
-- Name: IX_Crimes_WantedPersonId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Crimes_WantedPersonId" ON public."Crimes" USING btree ("WantedPersonId");


--
-- TOC entry 4656 (class 1259 OID 74053)
-- Name: IX_Lawsuits_PersonId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Lawsuits_PersonId" ON public."Lawsuits" USING btree ("PersonId");


--
-- TOC entry 4665 (class 2606 OID 74035)
-- Name: Crimes FK_Crimes_CrimeTypes_TypeId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Crimes"
    ADD CONSTRAINT "FK_Crimes_CrimeTypes_TypeId" FOREIGN KEY ("TypeId") REFERENCES public."CrimeTypes"("Id") ON DELETE CASCADE;


--
-- TOC entry 4666 (class 2606 OID 74040)
-- Name: Crimes FK_Crimes_Lawsuits_LawsuitId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Crimes"
    ADD CONSTRAINT "FK_Crimes_Lawsuits_LawsuitId" FOREIGN KEY ("LawsuitId") REFERENCES public."Lawsuits"("Id");


--
-- TOC entry 4667 (class 2606 OID 74045)
-- Name: Crimes FK_Crimes_WantedPersons_WantedPersonId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Crimes"
    ADD CONSTRAINT "FK_Crimes_WantedPersons_WantedPersonId" FOREIGN KEY ("WantedPersonId") REFERENCES public."WantedPersons"("Id") ON DELETE CASCADE;


--
-- TOC entry 4664 (class 2606 OID 74023)
-- Name: Lawsuits FK_Lawsuits_WantedPersons_PersonId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lawsuits"
    ADD CONSTRAINT "FK_Lawsuits_WantedPersons_PersonId" FOREIGN KEY ("PersonId") REFERENCES public."WantedPersons"("Id") ON DELETE CASCADE;


-- Completed on 2025-01-03 02:42:00

--
-- PostgreSQL database dump complete
--

