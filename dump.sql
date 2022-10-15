--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

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
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    visitors integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now()
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 'a1b2c3d4', 1, '2022-10-13 14:02:29.349705');
INSERT INTO public.sessions VALUES (2, '5e2c9662-aac9-454f-8c6d-bd995d704c5d', 3, '2022-10-13 18:46:08.708827');
INSERT INTO public.sessions VALUES (3, '5fb3af2c-3e7c-433d-8b49-acbae701f38c', 3, '2022-10-14 12:24:00.632464');
INSERT INTO public.sessions VALUES (4, '8d166e01-6989-4e84-ac86-041f66d29b5c', 3, '2022-10-14 12:28:21.391203');
INSERT INTO public.sessions VALUES (5, '1afdb648-a7ff-46d1-9118-d53cbbfe1a13', 5, '2022-10-14 13:37:10.059027');
INSERT INTO public.sessions VALUES (6, 'caf2d303-d1b4-4b27-bd55-c790cfa3e325', 5, '2022-10-14 13:38:00.869682');
INSERT INTO public.sessions VALUES (7, 'fd264fb5-3ec5-40a7-aabb-6558f2c30576', 5, '2022-10-14 13:38:47.667601');
INSERT INTO public.sessions VALUES (8, '7d6cff6c-5d75-4fed-8d66-47d6d391a7d6', 5, '2022-10-14 13:39:50.369298');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (5, 1, 'https://ge.globo.com', 'co1234de', 0, '2022-10-13 19:39:07.438027');
INSERT INTO public.urls VALUES (1, 1, 'https://globo.com', 'co12de', 8, '2022-10-13 18:55:49.731587');
INSERT INTO public.urls VALUES (11, 3, 'https://instagram.com', 'social4', 0, '2022-10-13 19:53:23.887501');
INSERT INTO public.urls VALUES (6, 2, 'https://google.com', 'goo1gle', 6, '2022-10-13 19:51:34.664973');
INSERT INTO public.urls VALUES (7, 2, 'https://amazon.com', 'goo2gle', 3, '2022-10-13 19:51:59.505861');
INSERT INTO public.urls VALUES (8, 3, 'https://linkedin.com', 'social1', 4, '2022-10-13 19:52:45.46762');
INSERT INTO public.urls VALUES (9, 3, 'https://facebook.com', 'social2', 6, '2022-10-13 19:53:03.736672');
INSERT INTO public.urls VALUES (10, 3, 'https://twitter.com', 'social3', 1, '2022-10-13 19:53:14.359509');
INSERT INTO public.urls VALUES (13, 4, 'https://spotify.com', 'social5', 0, '2022-10-13 23:38:51.154551');
INSERT INTO public.urls VALUES (14, 1, 'https://gmail.com', 'Fpu2PBzWMFLNaXcytRD8V', 1, '2022-10-14 00:56:00.479532');
INSERT INTO public.urls VALUES (15, 1, 'https://www.netflix.com/br/', '6oO4sGiP0DKITWV18PWwB', 0, '2022-10-14 14:47:50.26666');
INSERT INTO public.urls VALUES (17, 3, 'a', 'WJDJqkOfRJNSZiZefaEwY', 0, '2022-10-14 15:54:52.061569');
INSERT INTO public.urls VALUES (18, 1, 'https://teste.com', 'Pq9DdC5vUDI6MyfrwWckh', 0, '2022-10-14 15:56:54.889805');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'teste', 'teste@teste.com', 'abc123', '2022-10-13 14:02:25.803558');
INSERT INTO public.users VALUES (2, 'a', 'a@a.com', 'a', '2022-10-13 17:09:09.425003');
INSERT INTO public.users VALUES (3, 'b', 'b@b.com', '$2b$10$/kEPQ23vm60iZr/.7MVCY.Ve2EGQq6.Afx/xpvgOtsnAXYpDdYHTe', '2022-10-13 17:16:09.308962');
INSERT INTO public.users VALUES (4, 'c', 'c@c.com', 'abc123', '2022-10-13 21:52:29.731652');
INSERT INTO public.users VALUES (5, 'd', 'd@d.com', '$2b$10$98jjo3zew2TsZQICFxzXVuEyTnlaPhzIIznSDKS/HM7eYvLvEVx4a', '2022-10-14 13:32:20.133613');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 8, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 18, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: urls urls_url_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_url_key UNIQUE (url);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

