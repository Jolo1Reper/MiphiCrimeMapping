--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2025-01-27 03:52:24

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
-- TOC entry 2 (class 3079 OID 98574)
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- TOC entry 5757 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 99655)
-- Name: CrimeTypes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CrimeTypes" (
    "Id" uuid NOT NULL,
    "Title" text NOT NULL,
    "Description" text,
    "Link" text,
    "Color" text DEFAULT ''::text NOT NULL,
    "CreateAt" timestamp with time zone DEFAULT '-infinity'::timestamp with time zone NOT NULL
);


ALTER TABLE public."CrimeTypes" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 99681)
-- Name: Crimes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Crimes" (
    "Id" uuid NOT NULL,
    "Applicant" text,
    "TypeId" uuid NOT NULL,
    "WantedPersonId" uuid,
    "Location" text DEFAULT ''::text NOT NULL,
    "CreateAt" timestamp with time zone NOT NULL,
    "LawsuitId" uuid,
    "CrimeDate" timestamp with time zone DEFAULT '-infinity'::timestamp with time zone NOT NULL,
    "Point" public.geometry NOT NULL,
    "Description" text
);


ALTER TABLE public."Crimes" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 99669)
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
-- TOC entry 223 (class 1259 OID 99662)
-- Name: WantedPersons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."WantedPersons" (
    "Id" uuid NOT NULL,
    "Name" text NOT NULL,
    "Surname" text NOT NULL,
    "Patronymic" text,
    "BirthDate" timestamp with time zone NOT NULL,
    "RegistrationAddress" text,
    "AddInfo" text,
    "CreateAt" timestamp with time zone DEFAULT '-infinity'::timestamp with time zone NOT NULL
);


ALTER TABLE public."WantedPersons" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 99650)
-- Name: __EFMigrationsHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);


ALTER TABLE public."__EFMigrationsHistory" OWNER TO postgres;

--
-- TOC entry 5748 (class 0 OID 99655)
-- Dependencies: 222
-- Data for Name: CrimeTypes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CrimeTypes" ("Id", "Title", "Description", "Link", "Color", "CreateAt") FROM stdin;
0f5a55fd-ca82-4f00-99c5-3ef13cdd3648	Насилие	\N	https://www.consultant.ru/document/cons_doc_LAW_10699/6b12cdea9308b35504628c3292186f5140f65a68/	#30c54e	2024-12-22 00:00:00+03
8fdfcea4-ddb1-46fd-ad0c-66be6156d550	Убийство	\N	https://www.consultant.ru/document/cons_doc_LAW_10699/5b3e04338020a09b25fe98ea83bc9362c8bc5a76/	#d70f19	2025-01-05 00:00:00+03
9cd0be1a-3952-40c9-a93a-bff647ec85e6	Кража	Незаконное завладение чужим имуществом	https://www.consultant.ru/document/cons_doc_LAW_10699/57b5c7b83fcd2cf40cabe2042f2d8f04ed6875ad/	#a929ff	2025-01-15 00:00:00+03
01943e21-bc4f-7616-b762-175694e57639	Тяжелое увечье	тяжелое преступление, прям дас	https://www.consultant.ru/document/cons_doc_LAW_10699/e7204e825c8e87b5c7be210b06a0cde61cd60a3c/	#ff00f7	2025-01-25 00:00:00+03
01949467-48c0-767a-a42b-04fc1ed3fa54	Угон	Угон транспортного средства	https://www.consultant.ru/document/cons_doc_LAW_10699/1917a12954153390d74667e91d0af4f261e560dc/	#f3f708	2025-01-23 21:23:04.364758+03
01949467-e367-7daa-aa18-034bb28ffda7	Наркотики	\N	\N	#ff8800	2025-01-23 21:23:43.974118+03
01944833-52b7-7460-9adc-bfbe771c8679	Грабеж	Открытое хищение чужого имущества	https://www.consultant.ru/document/cons_doc_LAW_10699/8727611b42df79f2b3ef8d2f3b68fea711ed0c7a/	#2fbbe9	2025-01-27 01:25:05.520126+03
\.


--
-- TOC entry 5751 (class 0 OID 99681)
-- Dependencies: 225
-- Data for Name: Crimes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Crimes" ("Id", "Applicant", "TypeId", "WantedPersonId", "Location", "CreateAt", "LawsuitId", "CrimeDate", "Point", "Description") FROM stdin;
019490a9-7264-7368-b150-cc03b537e8b6		01944833-52b7-7460-9adc-bfbe771c8679	81e9e469-4c14-4f06-8cec-a901240c6ce3	Волгодонск, улица Ленина, 75	2025-01-23 03:56:51.531738+03	\N	2025-01-23 03:00:00+03	0101000020E6100000723D718968144540DC574EC0D4C14740	\N
019490a9-8cd9-775a-b92f-b4e02112469d		0f5a55fd-ca82-4f00-99c5-3ef13cdd3648	0194295c-ab01-7f16-9b60-8d186431f90f	Волгодонск, Советская улица, 81	2025-01-23 03:56:58.328348+03	\N	2025-01-23 03:00:00+03	0101000020E6100000703D71DD14144540BAB5AE6F85C14740	\N
019490a9-b78c-708b-a992-8663eff157ca		9cd0be1a-3952-40c9-a93a-bff647ec85e6	01942ecf-97ae-7fb6-ab03-81a560a7fe59	Волгодонск, улица Ленина, 88	2025-01-23 03:57:09.260412+03	\N	2025-01-23 03:00:00+03	0101000020E6100000723D7163251445403E66DACCD8C14740	\N
019490a9-d97d-7285-b930-5b37376d8a33		8fdfcea4-ddb1-46fd-ad0c-66be6156d550	\N	Волгодонск, улица Ленина, 98	2025-01-23 03:57:17.949541+03	\N	2025-01-23 03:00:00+03	0101000020E6100000016B531A9E1445400E01761E87C14740	\N
019490a9-fffd-7edd-8157-47cf46926df1		0f5a55fd-ca82-4f00-99c5-3ef13cdd3648	345e254f-7869-4d1a-bbd1-bee9fc0b5102	Волгодонск, улица 50 лет ВЛКСМ, 4	2025-01-23 03:57:27.805391+03	\N	2025-01-23 03:00:00+03	0101000020E6100000026B53DA57134540C9052758E7C14740	\N
019490aa-28b8-7c1a-b412-ed51b27b9efb		01943e21-bc4f-7616-b762-175694e57639	019484f1-a1c3-76fb-86f8-2d883c79df10	Волгодонск	2025-01-23 03:57:38.232674+03	\N	2025-01-23 03:00:00+03	0101000020E610000030972860F51245405879FEE525C24740	\N
019490aa-6435-773e-b5e9-2d40caa9b948		0f5a55fd-ca82-4f00-99c5-3ef13cdd3648	01948552-6486-7e89-b564-d0770903392f	Волгодонск, Пионерская улица, 127/19	2025-01-23 03:57:53.461189+03	\N	2025-01-23 03:00:00+03	0101000020E6100000A67BB86D77134540E1EF2D5732C14740	\N
019490aa-91e9-7bb1-a2b5-3f80c29a9671		01943e21-bc4f-7616-b762-175694e57639	019484f1-a1c3-76fb-86f8-2d883c79df10	Волгодонск, квартал ЮЗР-3	2025-01-23 03:58:05.161868+03	\N	2025-01-23 03:00:00+03	0101000020E61000005FB967F34214454062633706BBC04740	\N
019490aa-b22a-762e-ab3f-e396d95fbea3		01944833-52b7-7460-9adc-bfbe771c8679	81e9e469-4c14-4f06-8cec-a901240c6ce3	Волгодонск, улица Максима Горького, 188	2025-01-23 03:58:13.418725+03	\N	2025-01-23 03:00:00+03	0101000020E61000005FB967D3AD14454070FF5596AAC04740	\N
019490aa-d09c-7689-b0f9-ec9ee926362c		0f5a55fd-ca82-4f00-99c5-3ef13cdd3648	3559cdf1-e821-484a-aa10-83962847d6c1	Волгодонск, улица Максима Горького, 161	2025-01-23 03:58:21.212376+03	\N	2025-01-23 03:00:00+03	0101000020E6100000C334AA7B231545409A8E3526B6C04740	\N
01942ecf-b49e-7f42-a2f9-0328d51f937c	\N	9cd0be1a-3952-40c9-a93a-bff647ec85e6	01942ecf-97ae-7fb6-ab03-81a560a7fe59	Волгодонск	2025-01-04 03:55:44.114768+03	\N	2024-12-12 03:00:00+03	0101000020E610000034DF4F9D3D134540927DA78075C24740	\N
01942ee9-8e44-7b25-a69b-8fbae1076b0f	\N	9cd0be1a-3952-40c9-a93a-bff647ec85e6	01942ecf-97ae-7fb6-ab03-81a560a7fe59	Пятерочка	2025-01-04 04:24:05.823636+03	\N	2024-03-03 03:00:00+03	0101000020E610000036DF4FBDB31345408AAAF1F38EC14740	\N
01942eef-c2f0-7c63-a9f0-f7f059c5da18	\N	9cd0be1a-3952-40c9-a93a-bff647ec85e6	01942ecf-97ae-7fb6-ab03-81a560a7fe59	Кино	2025-01-04 04:30:52.522927+03	\N	2024-12-31 03:00:00+03	0101000020E610000054E6220991184540A1072EED4DC24740	\N
01946b8b-a409-7d28-b2a5-7d31bd32f127	\N	01944833-52b7-7460-9adc-bfbe771c8679	12654663-c462-44cf-847e-a626d4313b1c	Волгодонск, Советская улица, 87	2025-01-15 22:58:21.193013+03	\N	2025-01-15 03:00:00+03	0101000020E610000035DF4F1B281445403826660F71C14740	\N
01946b98-35b4-744e-9eac-1c5155ee91c2	\N	8fdfcea4-ddb1-46fd-ad0c-66be6156d550	7f4f062f-8da3-47e6-b8be-4759e48edb9b	Волгодонск, Вокзальный переулок	2025-01-15 23:12:04.888677+03	\N	2025-01-15 03:00:00+03	0101000020E610000031DF8FB3F5134540CDB982CABBC14740	\N
01946ba3-b3c1-7abf-a501-d1973523e79d	\N	01943e21-bc4f-7616-b762-175694e57639	81e9e469-4c14-4f06-8cec-a901240c6ce3	Волгодонск, улица Ленина, 52	2025-01-15 23:24:38.053765+03	\N	2025-01-15 03:00:00+03	0101000020E610000078DDBF123D134540A669030E71C24740	\N
01946c31-13b0-7edf-ae0d-6380a06d834d	\N	01944833-52b7-7460-9adc-bfbe771c8679	01942ecf-97ae-7fb6-ab03-81a560a7fe59	Волгодонск, улица Максима Горького	2025-01-16 01:59:03.215616+03	\N	2025-01-15 03:00:00+03	0101000020E6100000D396055757134540B78D48C49AC14740	\N
01947614-85f9-7e23-98b3-8b36d167aa68	\N	0f5a55fd-ca82-4f00-99c5-3ef13cdd3648	0194295c-ab01-7f16-9b60-8d186431f90f	Волгодонск, улица Ленина, 122	2025-01-18 00:04:04.071264+03	\N	2025-01-17 03:00:00+03	0101000020E6100000B17336B0981545407D950ABDB5C04740	\N
01947632-15a0-7d27-97b9-423e3e18463e	\N	0f5a55fd-ca82-4f00-99c5-3ef13cdd3648	81e9e469-4c14-4f06-8cec-a901240c6ce3	Волгодонск, улица 2-я Линия, 56	2025-01-18 00:36:26.527591+03	\N	2023-12-12 03:00:00+03	0101000020E6100000DD635191A8104540B0A2BF5709C84740	\N
01947fe8-7fe0-7931-97b8-4848b5493960	\N	01944833-52b7-7460-9adc-bfbe771c8679	81e9e469-4c14-4f06-8cec-a901240c6ce3	Волгодонск, улица Ленина, 88	2025-01-19 21:59:14.449614+03	\N	2025-01-19 03:00:00+03	0101000020E610000009F3BF6D2514454015B70DF6D6C14740	\N
019490ac-8883-7bc8-a190-a546edc5106d		01943e21-bc4f-7616-b762-175694e57639	7f4f062f-8da3-47e6-b8be-4759e48edb9b	Волгодонск, Новый проезд, 1	2025-01-23 04:00:13.827672+03	\N	2025-01-23 03:00:00+03	0101000020E610000034DF4F8AC41745400F0D5C2EF9C14740	\N
019490ac-b0c6-74d9-9da5-c0d5f2956b98		01944833-52b7-7460-9adc-bfbe771c8679	3559cdf1-e821-484a-aa10-83962847d6c1	Волгодонск, Весенняя улица, 56	2025-01-23 04:00:24.133991+03	\N	2025-01-23 03:00:00+03	0101000020E6100000B004F745CB174540A8740F4FC5C14740	\N
0194942a-ccba-73d9-aad4-445599be12e6		8fdfcea4-ddb1-46fd-ad0c-66be6156d550	0194942a-6613-7752-a662-874450596021	Волгодонск, улица Максима Горького, 28	2025-01-23 20:17:00.459746+03	\N	2025-01-23 03:00:00+03	0101000020E610000036DF4F1D191245409E0C6B6768C24740	\N
01949468-453c-73ae-99dd-cba4c8697bd5		01949467-e367-7daa-aa18-034bb28ffda7	0194942a-6613-7752-a662-874450596021	Волгодонск, Морская улица, 15К	2025-01-23 21:24:09.008252+03	\N	2025-01-10 03:00:00+03	0101000020E610000036DF4F0C831345402499AB93F1C24740	\N
01949563-bd6b-7241-a9dc-df9d1e37ef86		01949467-e367-7daa-aa18-034bb28ffda7	0194859a-82b0-7352-aef0-2a97c794a86f	Волгодонск, Морская улица, 23А	2025-01-24 01:58:49.288109+03	\N	2025-01-21 03:00:00+03	0101000020E6100000E652476327144540CEAF8E2F83C24740	\N
01949f00-43a1-7bb9-bd3f-db4c5b923acb		01944833-52b7-7460-9adc-bfbe771c8679	\N	Волгодонск, улица 30 лет Победы, 25	2025-01-25 22:46:22.216717+03	\N	2025-01-25 03:00:00+03	0101000020E610000033DF4F0DDB144540DF6871921DC14740	\N
01949f55-44ae-74ff-b39d-ff9c62802c68		01949467-48c0-767a-a42b-04fc1ed3fa54	\N	Волгодонск	2025-01-26 00:19:13.044449+03	\N	2025-01-25 03:00:00+03	0101000020E610000036DF4F754713454061CCAEB61AC14740	\N
01949f55-a833-7668-bebd-f261f9fd29ca		01943e21-bc4f-7616-b762-175694e57639	0194859a-82b0-7352-aef0-2a97c794a86f	Волгодонск, переулок Кирова, 50	2025-01-26 00:19:38.546746+03	\N	2025-01-25 03:00:00+03	0101000020E610000035DF4F8F4A1445402FF55ADE35C14740	\N
01949f5e-b303-7bee-a911-7c8dcba73767		01949467-e367-7daa-aa18-034bb28ffda7	01948552-6486-7e89-b564-d0770903392f	Волгодонск, улица 50 лет СССР, 21	2025-01-26 00:29:31.114834+03	\N	2025-01-25 03:00:00+03	0101000020E610000005999F60D7134540A8571144CAC14740	\N
01949f61-77a5-74e0-a3ec-9466ad5c13e4		01949467-48c0-767a-a42b-04fc1ed3fa54	\N	Волгодонск, Вокзальный переулок, 56	2025-01-26 00:32:54.675815+03	\N	2025-01-25 03:00:00+03	0101000020E610000037DF4F07001445409FE6CDBAB6C14740	
0194958e-33cb-7287-a5bf-6e83e47c4b3e		01949467-e367-7daa-aa18-034bb28ffda7	0194852d-1a70-7e3e-8c9c-dcb2c5045295		2025-01-26 23:04:13.184862+03	\N	2025-01-23 03:00:00+03	0101000020E610000035DF4F7BE71245406C5B823D93C14740	
0194a465-df88-78bc-abd5-96e9356a1908		8fdfcea4-ddb1-46fd-ad0c-66be6156d550	\N	Волгодонск, Степная улица, 31	2025-01-27 00:03:51.53645+03	\N	2025-01-26 03:00:00+03	0101000020E610000035DF4FA5091245405A26ACE7CEC14740	qq
0194a4da-40a8-73ac-b983-0bf605355874		01949467-48c0-767a-a42b-04fc1ed3fa54	0194a4d9-9cab-715e-90c8-29e8d8dfea38	Волгодонск, Советская улица, 48	2025-01-27 02:02:34.397275+03	\N	2025-01-26 03:00:00+03	0101000020E610000036DF4F0504124540C9253B92D3C24740	\N
0194a4da-7b44-76ec-a786-6573e41b65eb		01949467-e367-7daa-aa18-034bb28ffda7	0194a4d9-0b78-7b98-b5b4-38bdd91976f0	Волгодонск, Заречная улица, 6Б	2025-01-27 02:02:49.412038+03	\N	2025-01-26 03:00:00+03	0101000020E6100000CA502DE684174540D2F2C9A871C24740	\N
0194a4da-ee41-746d-9612-1ecab330c63c		9cd0be1a-3952-40c9-a93a-bff647ec85e6	019485c2-4cdd-791d-8bfd-ef2a74cc8d98	Волгодонск, проспект Строителей, 2Д	2025-01-27 02:03:18.849439+03	\N	2025-01-26 03:00:00+03	0101000020E610000035DF4F4B8A184540BC47918D5FC14740	\N
0194a4db-a448-74fe-bdb6-ed7db7446afb		0f5a55fd-ca82-4f00-99c5-3ef13cdd3648	0194a4db-a43a-761d-ae94-11238e93aa09	Волгодонск, Вербовый переулок, 4	2025-01-27 02:04:05.431959+03	\N	2025-01-26 03:00:00+03	0101000020E6100000C6E6D7194A1745405E88221C45C34740	\N
0194a4dc-84a1-7bcf-a976-4dc4922bf75e		8fdfcea4-ddb1-46fd-ad0c-66be6156d550	0194a4dc-849b-7099-9ae5-29c329c34bdd	Волгодонск, переулок Пупкова, 12с3	2025-01-27 02:05:02.873559+03	\N	2025-01-26 03:00:00+03	0101000020E6100000C6E6D77BD8174540B718ED00FCC24740	\N
0194a4dd-3633-735d-8904-8e2c71104e3a		9cd0be1a-3952-40c9-a93a-bff647ec85e6	0194a4dd-362e-777c-a73b-4fe28d91bec8	Волгодонск, Приморский переулок, 13	2025-01-27 02:05:48.331317+03	\N	2025-01-26 03:00:00+03	0101000020E6100000C9E6D76B9D1745407EABA77FE0C24740	\N
0194a4dd-d3b2-70f7-857e-15f9508ed745		01943e21-bc4f-7616-b762-175694e57639	0194a4dd-d3ab-726f-bbc4-d378a46e7ed4	Волгодонск, переулок Пупкова, 5	2025-01-27 02:06:28.64782+03	\N	2025-01-13 03:00:00+03	0101000020E6100000C9E6D760991745400F3CC7BDF9C24740	\N
\.


--
-- TOC entry 5750 (class 0 OID 99669)
-- Dependencies: 224
-- Data for Name: Lawsuits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Lawsuits" ("Id", "Number", "ReceiptDate", "PersonId", "Judge", "DecisionDate", "Decision", "EffectiveDate", "JudicialActs") FROM stdin;
\.


--
-- TOC entry 5749 (class 0 OID 99662)
-- Dependencies: 223
-- Data for Name: WantedPersons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."WantedPersons" ("Id", "Name", "Surname", "Patronymic", "BirthDate", "RegistrationAddress", "AddInfo", "CreateAt") FROM stdin;
81e9e469-4c14-4f06-8cec-a901240c6ce3	Иван	Иванов	\N	2000-01-01 03:00:00+03	\N	\N	2025-01-23 03:50:51.2825+03
7f4f062f-8da3-47e6-b8be-4759e48edb9b	Екатерина	Иванова	\N	1999-12-01 03:00:00+03	\N	\N	2025-01-23 03:50:51.2825+03
0194295c-ab01-7f16-9b60-8d186431f90f	Иван	Иванов	Иванович	1984-01-10 03:00:00+03	\N	Преступник, подозревается в краже	2025-01-23 03:50:51.2825+03
01942ecf-97ae-7fb6-ab03-81a560a7fe59	Евгений	Терехов	Игоревич	2005-12-12 03:00:00+03	Турция	Особо опасен	2025-01-23 03:50:51.2825+03
345e254f-7869-4d1a-bbd1-bee9fc0b5102	Егор	Верин	\N	1984-10-08 03:00:00+03	\N	\N	2025-01-23 03:50:51.2825+03
3559cdf1-e821-484a-aa10-83962847d6c1	Сергей	Петров	\N	2000-12-21 03:00:00+03	\N	Подозревается в грабежах	2025-01-23 03:50:51.2825+03
12654663-c462-44cf-847e-a626d4313b1c	Василий	Васильев	\N	1965-01-02 03:00:00+03	\N	Разыскивается за мошенничество	2025-01-23 03:50:51.2825+03
019484f1-a1c3-76fb-86f8-2d883c79df10	Алексей	Попов	Васильевич	2003-12-12 03:00:00+03	\N	\N	2025-01-23 03:50:51.2825+03
0194852d-1a70-7e3e-8c9c-dcb2c5045295	Кирилл	Петров	Дмитревич	1967-04-20 03:00:00+03	\N	\N	2025-01-23 03:50:51.2825+03
0194859a-82b0-7352-aef0-2a97c794a86f	Ирина	Даринова	Николаевна	1974-01-19 03:00:00+03	Волгодонск	\N	2025-01-23 03:50:51.2825+03
01948552-6486-7e89-b564-d0770903392f	Дарья	Калинова	Сергеевна	1996-02-05 03:00:00+03	Волгодонск	\N	2025-01-23 03:50:51.2825+03
019485c2-4cdd-791d-8bfd-ef2a74cc8d98	Диана	Клинчук	Романовна	1999-09-08 04:00:00+04	\N	\N	2025-01-23 03:50:51.2825+03
0194942a-6613-7752-a662-874450596021	Андрей	Боров	Геннадьевич	1987-05-19 04:00:00+04	\N	\N	2025-01-23 20:16:34.148441+03
0194a4d9-0b78-7b98-b5b4-38bdd91976f0	Сергей	Петров	Васильевич	1984-01-29 03:00:00+03	\N	\N	2025-01-27 02:01:15.256821+03
0194a4d9-9cab-715e-90c8-29e8d8dfea38	Алиса	Артемьева	Сергеевна	1989-03-05 03:00:00+03	\N	\N	2025-01-27 02:01:52.427748+03
0194a4db-a43a-761d-ae94-11238e93aa09	Вадим	Попов	Николаевич	1967-07-04 03:00:00+03	\N	\N	2025-01-27 02:04:05.434706+03
0194a4dc-849b-7099-9ae5-29c329c34bdd	Никита	Карилиев	Сергеевич	1999-08-08 04:00:00+04	\N	\N	2025-01-27 02:05:02.875312+03
0194a4dd-362e-777c-a73b-4fe28d91bec8	Сергей	Момедов	\N	2000-08-08 04:00:00+04	\N	\N	2025-01-27 02:05:48.334389+03
0194a4dd-d3ab-726f-bbc4-d378a46e7ed4	Дмитрий	Лебедев	Игоревич	1984-06-23 04:00:00+04	\N	\N	2025-01-27 02:06:28.651615+03
\.


--
-- TOC entry 5747 (class 0 OID 99650)
-- Dependencies: 221
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
20241221235734_AddIdRelashionshipsAndLawsuits	9.0.1
20241221235950_DelPointId	9.0.1
20241222003947_AddCrimeDate	9.0.1
20250101215144_ChangePointTypeToDecimal	9.0.1
20250108215455_AddCrimeTypeLinkColumn	9.0.1
20250111221841_AddColorCrimeType	9.0.1
20250114011638_RenamePointMe	9.0.1
20250114012859_AddGeoPointColumnToCrime	9.0.1
20250114012956_AddGeoPointColumnToCrime2	9.0.1
20250114013111_AddGeoPointColumnToCrime3	9.0.1
20250114013418_AddGeoPointColumnToCrime4	9.0.1
20250114014741_AddGeoPointColumnToCrime6	9.0.1
20250114020218_AddGeoPointColumnToCrimeUpdate	9.0.1
20250119180302_WantedPersonSetNull	9.0.1
20250120011811_AddCrimeDescription	9.0.1
20250120181644_WantedPersonOnDeleteSetNull	9.0.1
20250123003831_AddCreateDateCrimeTypesAndWantedPersons	9.0.1
20250126201242_LocationIsNotNull	9.0.1
20250126212356_CrimeTypeColorIsNotNull	9.0.1
\.


--
-- TOC entry 5572 (class 0 OID 98892)
-- Dependencies: 217
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- TOC entry 5584 (class 2606 OID 99661)
-- Name: CrimeTypes PK_CrimeTypes; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CrimeTypes"
    ADD CONSTRAINT "PK_CrimeTypes" PRIMARY KEY ("Id");


--
-- TOC entry 5594 (class 2606 OID 99687)
-- Name: Crimes PK_Crimes; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Crimes"
    ADD CONSTRAINT "PK_Crimes" PRIMARY KEY ("Id");


--
-- TOC entry 5589 (class 2606 OID 99675)
-- Name: Lawsuits PK_Lawsuits; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lawsuits"
    ADD CONSTRAINT "PK_Lawsuits" PRIMARY KEY ("Id");


--
-- TOC entry 5586 (class 2606 OID 99668)
-- Name: WantedPersons PK_WantedPersons; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WantedPersons"
    ADD CONSTRAINT "PK_WantedPersons" PRIMARY KEY ("Id");


--
-- TOC entry 5582 (class 2606 OID 99654)
-- Name: __EFMigrationsHistory PK___EFMigrationsHistory; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");


--
-- TOC entry 5590 (class 1259 OID 99703)
-- Name: IX_Crimes_LawsuitId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Crimes_LawsuitId" ON public."Crimes" USING btree ("LawsuitId");


--
-- TOC entry 5591 (class 1259 OID 99704)
-- Name: IX_Crimes_TypeId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Crimes_TypeId" ON public."Crimes" USING btree ("TypeId");


--
-- TOC entry 5592 (class 1259 OID 99705)
-- Name: IX_Crimes_WantedPersonId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Crimes_WantedPersonId" ON public."Crimes" USING btree ("WantedPersonId");


--
-- TOC entry 5587 (class 1259 OID 99706)
-- Name: IX_Lawsuits_PersonId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Lawsuits_PersonId" ON public."Lawsuits" USING btree ("PersonId");


--
-- TOC entry 5596 (class 2606 OID 99688)
-- Name: Crimes FK_Crimes_CrimeTypes_TypeId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Crimes"
    ADD CONSTRAINT "FK_Crimes_CrimeTypes_TypeId" FOREIGN KEY ("TypeId") REFERENCES public."CrimeTypes"("Id") ON DELETE CASCADE;


--
-- TOC entry 5597 (class 2606 OID 99693)
-- Name: Crimes FK_Crimes_Lawsuits_LawsuitId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Crimes"
    ADD CONSTRAINT "FK_Crimes_Lawsuits_LawsuitId" FOREIGN KEY ("LawsuitId") REFERENCES public."Lawsuits"("Id");


--
-- TOC entry 5598 (class 2606 OID 99731)
-- Name: Crimes FK_Crimes_WantedPersons_WantedPersonId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Crimes"
    ADD CONSTRAINT "FK_Crimes_WantedPersons_WantedPersonId" FOREIGN KEY ("WantedPersonId") REFERENCES public."WantedPersons"("Id") ON DELETE SET NULL;


--
-- TOC entry 5595 (class 2606 OID 99676)
-- Name: Lawsuits FK_Lawsuits_WantedPersons_PersonId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lawsuits"
    ADD CONSTRAINT "FK_Lawsuits_WantedPersons_PersonId" FOREIGN KEY ("PersonId") REFERENCES public."WantedPersons"("Id") ON DELETE CASCADE;


-- Completed on 2025-01-27 03:52:24

--
-- PostgreSQL database dump complete
--

