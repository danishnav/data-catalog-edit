export default [
    {
      "policyId": 240,
      "dataset": {
        "id": "c30ac412-6596-4611-8c6c-44fe8be08802",
        "title": "Sivilstand"
      },
      "legalBasisDescription": "Ved nytt krav og nytt barn",
      "purpose": {
        "code": "Arbeidsavklaringspenger (AAP)",
        "description": "Behandle og vurdere rett til arbeidsavklaringspenger som har til formål å sikre inntekt mens bruker får bistand fra NAV til å komme i arbeid."
      }
    },
    {
      "policyId": 241,
      "dataset": {
        "id": "c30ac412-6596-4611-8c6c-44fe8be08802",
        "title": "Sivilstand"
      },
      "legalBasisDescription": "Har betyding for pensjonsberegningen",
      "purpose": {
        "code": "Alderspensjon",
        "description": "Behandle og vurdere rett til alderspensjon som skal sikre inntekt for personer i alderdommen og å legge til rette for en fleksibel og gradvis overgang fra arbeid til pensjon."
      }
    },
    {
      "policyId": 242,
      "dataset": {
        "id": "c30ac412-6596-4611-8c6c-44fe8be08802",
        "title": "Sivilstand"
      },
      "legalBasisDescription": "Har betyding for pensjonsberegningen",
      "purpose": {
        "code": "Krigspensjon",
        "description": "Behandle og vurdere rett til krigspensjon, behandle endringer i løpende pensjoner."
      }
    },
    {
      "policyId": 243,
      "dataset": {
        "id": "c30ac412-6596-4611-8c6c-44fe8be08802",
        "title": "Sivilstand"
      },
      "legalBasisDescription": "Vurdering av sivilstand",
      "purpose": {
        "code": "Avtalefestet pensjon (AFP) for statlig og kommunal sektor",
        "description": "Yte avtalefestet pensjon til 62-65-åringer som ønsker å slutte i arbeid før oppnådd aldersgrense, og lagre AFP-opptjening for senere alderspensjon. Formålet med NAVs behandling ved AFP i kommunal sektor: Beregne AFP for den kommunale ordningen og lagre AFP-opptjening til senere alderspensjon."
      }
    },
    {
      "policyId": 244,
      "dataset": {
        "id": "c30ac412-6596-4611-8c6c-44fe8be08802",
        "title": "Sivilstand"
      },
      "legalBasisDescription": "knyttet til vilkåret for barnetrygd",
      "purpose": {
        "code": "Barnetrygd",
        "description": "Behandle og vurdere rett til barnetrygd som ikke er gitt automatisk til dekning av utgifter til forsørgelse av barn."
      }
    },
    {
      "policyId": 245,
      "dataset": {
        "id": "c30ac412-6596-4611-8c6c-44fe8be08802",
        "title": "Sivilstand"
      },
      "legalBasisDescription": "knyttet til vilkåret for Kontantstøtte",
      "purpose": {
        "code": "Kontantstøtte",
        "description": "Behandle og vurderer rett til kontantstøtte som skal gi familiene valgfrihet med hensyn til omsorgsform for egne barn."
      }
    },
    {
      "policyId": 246,
      "dataset": {
        "id": "c30ac412-6596-4611-8c6c-44fe8be08802",
        "title": "Sivilstand"
      },
      "legalBasisDescription": "Behovsprøving av forskudd. førstegangsfastsettelse. Endringssøknad.automatisk saksbehandling. Revurdering av løpende vedtak",
      "purpose": {
        "code": "Barnebidrag",
        "description": "Behandle krav om bidrag som skal sikre barnet midler til underhold når barnet ikke bor sammen med begge foreldrene."
      }
    },
    {
      "policyId": 247,
      "dataset": {
        "id": "c30ac412-6596-4611-8c6c-44fe8be08802",
        "title": "Sivilstand"
      },
      "legalBasisDescription": "Vurdering å kunne ansees som reell arbeidssøker",
      "purpose": {
        "code": "Dagpenger",
        "description": "Behandle og vurdere rett til dagpenger som har til formål å gi delvis dekning for bortfall av arbeidsinntekt ved arbeidsløshet."
      }
    },
    {
      "policyId": 248,
      "dataset": {
        "id": "c30ac412-6596-4611-8c6c-44fe8be08802",
        "title": "Sivilstand"
      },
      "legalBasisDescription": "Vuderinga av søknad/ endring utmåling og  opphør ektefellebidrag",
      "purpose": {
        "code": "Ektefellebidrag",
        "description": "Behandle og vurdere krav om ektefellebidrag som skal regulere retten til underholdsbidrag til ektefelle etter samlivsbrudd."
      }
    },
    {
      "policyId": 249,
      "dataset": {
        "id": "c30ac412-6596-4611-8c6c-44fe8be08802",
        "title": "Sivilstand"
      },
      "legalBasisDescription": "Vurdere vilkår om sivilstatus (ugift, separert eller skilt)",
      "purpose": {
        "code": "Stønad til enslig mor eller far",
        "description": "Behandle og vurdere rett til stønad til enslig mor og far, forvalte løpende ytelser."
      }
    }
  ]


  let create_policy = [
    {
      "datasetTitle": "string",
      "id": 0,
      "legalBasisDescription": "string",
      "purposeCode": "string"
    }
  ]

  //Delete policy trenger bare policyId via query i path 'id'