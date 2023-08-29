import { Link } from "react-router-dom";

export function Terms() {
  return (
    <div className="container">
      <div className="row">
        <div className="px-2 py-5 my-5 text-center">
          <h2 className="h3">Privatumo politika</h2>
          <div className="col-lg-6 mx-auto text-left">
            <p className="lead mb-4 ">
              Privatumo politika numeris1cv įmonei priklausančioje numeris1cv
              svetainėje yra renkami ir valdomi jūsų asmeniniai duomenys. Ši
              Privatumo politika išaiškina, kaip numeris1cv naudoja jūsų
              asmeninius duomenis bei pateikia priežastis jūsų asmeninių duomenų
              rinkimui. Dėl to, prieš naršant numeris1cv svetainėje,
              perskaitykite šį dokumentą. Mes užtikriname jūsų asmeninių duomenų
              saugumą ir konfidencialumą. Asmeniniai duomenys, kuriuos renkame:
              Kuomet naršote numeris1cv, automatiškai renkame tam tikrą
              informaciją apie jūsų įrenginį – naršyklė, IP adresas, laiko
              juosta ir jūsų įrenginio slapukai. Taip pat renkame statistinius
              duomenis apie naršymą svetainėje: puslapiai, kuriuose apsilankote,
              produktai, kuriuos peržiūrite bei kita svetainės naršymo
              informacija. Šią automatiškai renkamą informaciją vadiname
              „Įrenginio informacija“. Taip pat, galime rinkti asmeninius
              duomenis, kuriuos jūs mums suteikiate (vardas, pavardė, adresas,
              mokėjimo informacija ir t.t.) sukurdami paskyrą mūsų svetainėje.
              Kodėl renkame jūsų duomenis? Jūsų duomenų saugumas mums yra
              ypatingai svarbus, dėl to renkame ir valdome tik būtiniausius jūsų
              asmeninius duomenis, be kurių negalėtume užtikrinti sklandaus
              svetainės veikimo. Automatiškai renkami duomenys yra naudojami
              svetainės analitikoje. Tačiau užtikriname, kad statistinėje
              informacijoje neįmanoma atpažinti konkrečių vartotojų tapatybės.
              Galite apsilankyti mūsų svetainėje, nesuteikdami jokios
              informacijos, kuria būtų galima identifikuoti jūsų asmens
              tapatybę. Tačiau, jeigu norėsite pasinaudoti mūsų svetainės
              funkcijomis, norėsite gauti mūsų naujienlaiškį arba užpildysite
              mūsų kontaktinę formą, tuomet taip galite suteikti mums savo
              asmeninių duomenų: el. pašto adresą, vardą, pavardę, gyvenamosios
              vietos informaciją, telefono numerį. Turite pasirinkimą nesuteikti
              mums savo asmeninių duomenų, tačiau tokiu atveju negalėsite
              naudotis dauguma svetainės teikiamų funkcijų. Svetainės
              lankytojai, nežinantys, kokią informaciją privalome rinkti, gali
              susisiekti su mumis el. paštu andriuscanis@gmail.com. Jūsų teisės:
              Jeigu esate Europos gyventojas, jūs turite įvairių teisių,
              susijusių su jūsų asmens duomenų apsauga: Teisė būti informuotam.
              Teisė gauti savo informaciją, kurią mes tvarkome. Teisė taisyti
              netikslią ar neteisingą informaciją apie jus. Teisė ištrinti visus
              duomenis apie jus. Teisė apriboti duomenų tvarkymą. Teisė perkelti
              visus surinktus duomenis apie jus kitam valdytojui. Teisė
              paprieštarauti asmens duomenų tvarkymui. Teisės, susijusios su
              automatinių duomenų valdymu. Jeigu norite daugiau informacijos,
              susisiekite su mumis pasinaudoję žemiau pateikta kontaktine
              informacija. Perspėjame, kad valdome Europos gyventojų asmeninius
              duomenis, norėdami išpildyti jūsų užsakymus arba kitaip
              įgyvendinti tikslus, išvardytus dokumento pradžioje. Atkreipkite
              dėmesį, kad jūsų duomenys gali būti perkelti už Europos ribų
              (pavyzdžiui, į Kanadą arba JAV). Nuorodos į kitas svetaines: Mūsų
              svetainėje gali būti kitų svetainių, kurių mes nevaldome,
              nuorodos. Pažymime, kad mes nesame atsakingi už kitų svetainių ar
              trečiųjų šalių asmeninių duomenų rinkimo procesus. Palikus mūsų
              svetainę, rekomenduojame perskaityti trečiųjų šalių svetainių
              privatumo politikas. Duomenų apsauga: Jūsų asmeninių duomenų
              apsaugai pasitelkiame aukščiausios kokybės serverius, kuriuos gali
              pasiekti tik įgalioti asmenys. Mes reguliariai stebime savo
              sistemas, norėdami nustatyti, ar nėra kokių nors pažeidžiamų vietų
              ar kibernetinių atakų, kurių metu galėtų nukentėti jūsų asmeniniai
              duomenys. Nepaisant to, negarantuojame absoliutaus jūsų asmeninių
              duomenų saugumo. Duomenų atskleidimas: Įstatymo numatyta tvarka
              pasiliekame teisę atskleisti jūsų asmeninius duomenis, jei reikėtų
              apginti savo teises, savo ir aplinkinių saugumą, ištirti
              nusikaltimą arba atsakyti į vyriausybės prašymą atskleisti jūsų
              asmeninius duomenis. Kontaktinė informacija: Jeigu norite gauti
              daugiau informacijos apie šią privatumo politiką arba apie jūsų
              asmeninius duomenis, kreipkitės į mus el. paštu
              email@gmail.com.
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link
                to="/register"
                className="btn btn-primary btn-lg px-4 gap-3"
              >
                ATGAL
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
