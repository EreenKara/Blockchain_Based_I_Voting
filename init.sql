--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: Cities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cities" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "countryId" integer NOT NULL,
    "parentId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Cities" OWNER TO postgres;

--
-- Name: Cities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Cities_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Cities_id_seq" OWNER TO postgres;

--
-- Name: Cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Cities_id_seq" OWNED BY public."Cities".id;


--
-- Name: Districts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Districts" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "cityId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Districts" OWNER TO postgres;

--
-- Name: Districts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Districts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Districts_id_seq" OWNER TO postgres;

--
-- Name: Districts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Districts_id_seq" OWNED BY public."Districts".id;


--
-- Name: Elections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Elections" (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(255),
    "startDate" timestamp with time zone NOT NULL,
    "endDate" timestamp with time zone NOT NULL,
    "createdBy" character varying(255) NOT NULL,
    "isActive" boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Elections" OWNER TO postgres;

--
-- Name: Elections_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Elections_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Elections_id_seq" OWNER TO postgres;

--
-- Name: Elections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Elections_id_seq" OWNED BY public."Elections".id;


--
-- Name: Neighbourhoods; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Neighbourhoods" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "districtId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Neighbourhoods" OWNER TO postgres;

--
-- Name: Neighbourhoods_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Neighbourhoods_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Neighbourhoods_id_seq" OWNER TO postgres;

--
-- Name: Neighbourhoods_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Neighbourhoods_id_seq" OWNED BY public."Neighbourhoods".id;


--
-- Name: Options; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Options" (
    id integer NOT NULL,
    "optionName" character varying(255) NOT NULL,
    "optionImgUrl" character varying(255),
    "optionDescription" character varying(255),
    "createdBy" character varying(255) NOT NULL,
    "voteCount" integer DEFAULT 0,
    "electionId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Options" OWNER TO postgres;

--
-- Name: Options_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Options_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Options_id_seq" OWNER TO postgres;

--
-- Name: Options_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Options_id_seq" OWNED BY public."Options".id;


--
-- Name: UserAdresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserAdresses" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "cityId" integer NOT NULL,
    "districtId" integer NOT NULL,
    "neighbourhoodId" integer NOT NULL,
    "buildingNumber" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."UserAdresses" OWNER TO postgres;

--
-- Name: UserAdresses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UserAdresses_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."UserAdresses_id_seq" OWNER TO postgres;

--
-- Name: UserAdresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UserAdresses_id_seq" OWNED BY public."UserAdresses".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    "identityNumber" character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    "phoneNumber" character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "hasPaidBalance" boolean DEFAULT false,
    "verificationCode" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: results; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.results (
    id integer NOT NULL,
    "electionId" character varying(255) NOT NULL,
    "winnerOption" jsonb NOT NULL,
    "createdAt" timestamp with time zone
);


ALTER TABLE public.results OWNER TO postgres;

--
-- Name: results_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.results_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.results_id_seq OWNER TO postgres;

--
-- Name: results_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.results_id_seq OWNED BY public.results.id;


--
-- Name: votes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.votes (
    id integer NOT NULL,
    "electionId" character varying(255) NOT NULL,
    "optionId" character varying(255) NOT NULL,
    "votedBy" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.votes OWNER TO postgres;

--
-- Name: votes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.votes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.votes_id_seq OWNER TO postgres;

--
-- Name: votes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.votes_id_seq OWNED BY public.votes.id;


--
-- Name: Cities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cities" ALTER COLUMN id SET DEFAULT nextval('public."Cities_id_seq"'::regclass);


--
-- Name: Districts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Districts" ALTER COLUMN id SET DEFAULT nextval('public."Districts_id_seq"'::regclass);


--
-- Name: Elections id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Elections" ALTER COLUMN id SET DEFAULT nextval('public."Elections_id_seq"'::regclass);


--
-- Name: Neighbourhoods id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Neighbourhoods" ALTER COLUMN id SET DEFAULT nextval('public."Neighbourhoods_id_seq"'::regclass);


--
-- Name: Options id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Options" ALTER COLUMN id SET DEFAULT nextval('public."Options_id_seq"'::regclass);


--
-- Name: UserAdresses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserAdresses" ALTER COLUMN id SET DEFAULT nextval('public."UserAdresses_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Name: results id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.results ALTER COLUMN id SET DEFAULT nextval('public.results_id_seq'::regclass);


--
-- Name: votes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.votes ALTER COLUMN id SET DEFAULT nextval('public.votes_id_seq'::regclass);


--
-- Name: Cities Cities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cities"
    ADD CONSTRAINT "Cities_pkey" PRIMARY KEY (id);


--
-- Name: Districts Districts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Districts"
    ADD CONSTRAINT "Districts_pkey" PRIMARY KEY (id);


--
-- Name: Elections Elections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Elections"
    ADD CONSTRAINT "Elections_pkey" PRIMARY KEY (id);


--
-- Name: Neighbourhoods Neighbourhoods_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Neighbourhoods"
    ADD CONSTRAINT "Neighbourhoods_pkey" PRIMARY KEY (id);


--
-- Name: Options Options_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Options"
    ADD CONSTRAINT "Options_pkey" PRIMARY KEY (id);


--
-- Name: UserAdresses UserAdresses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserAdresses"
    ADD CONSTRAINT "UserAdresses_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_identityNumber_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_identityNumber_key" UNIQUE ("identityNumber");


--
-- Name: Users Users_phoneNumber_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_phoneNumber_key" UNIQUE ("phoneNumber");


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: results results_electionId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.results
    ADD CONSTRAINT "results_electionId_key" UNIQUE ("electionId");


--
-- Name: results results_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.results
    ADD CONSTRAINT results_pkey PRIMARY KEY (id);


--
-- Name: votes votes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_pkey PRIMARY KEY (id);


--
-- Name: Districts Districts_cityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Districts"
    ADD CONSTRAINT "Districts_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES public."Cities"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Neighbourhoods Neighbourhoods_districtId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Neighbourhoods"
    ADD CONSTRAINT "Neighbourhoods_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES public."Districts"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Options Options_electionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Options"
    ADD CONSTRAINT "Options_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES public."Elections"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserAdresses UserAdresses_cityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserAdresses"
    ADD CONSTRAINT "UserAdresses_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES public."Cities"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserAdresses UserAdresses_districtId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserAdresses"
    ADD CONSTRAINT "UserAdresses_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES public."Districts"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserAdresses UserAdresses_neighbourhoodId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserAdresses"
    ADD CONSTRAINT "UserAdresses_neighbourhoodId_fkey" FOREIGN KEY ("neighbourhoodId") REFERENCES public."Neighbourhoods"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

