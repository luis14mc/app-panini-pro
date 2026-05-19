import mundialLogo from '../assets/mundial_2026.webp';
import alemania from '../assets/mundial2026/alemania.webp';
import arabiasaudita from '../assets/mundial2026/arabiasaudita.webp';
import argelia from '../assets/mundial2026/argelia.webp';
import argentina from '../assets/mundial2026/argentina.webp';
import australia from '../assets/mundial2026/australia.webp';
import austria from '../assets/mundial2026/austria.webp';
import belgica from '../assets/mundial2026/belgica.webp';
import bosnia from '../assets/mundial2026/bosnia.webp';
import brasil from '../assets/mundial2026/brasil.webp';
import caboVerde from '../assets/mundial2026/cabo_verde.webp';
import canada from '../assets/mundial2026/canada.webp';
import colombia from '../assets/mundial2026/colombia.webp';
import congo from '../assets/mundial2026/congo.webp';
import coreadelsur from '../assets/mundial2026/coreadelsur.webp';
import costaDeMarfil from '../assets/mundial2026/costa_de_marfil.webp';
import croacia from '../assets/mundial2026/croacia.webp';
import curazao from '../assets/mundial2026/curazao.webp';
import ecuador from '../assets/mundial2026/ecuador.webp';
import egipto from '../assets/mundial2026/egipto.webp';
import escocia from '../assets/mundial2026/escocia.webp';
import espana from '../assets/mundial2026/espana.webp';
import francia from '../assets/mundial2026/francia.webp';
import ghana from '../assets/mundial2026/ghana.webp';
import haiti from '../assets/mundial2026/haiti.webp';
import inglaterra from '../assets/mundial2026/inglaterra.webp';
import irak from '../assets/mundial2026/irak.webp';
import iran from '../assets/mundial2026/iran.webp';
import japon from '../assets/mundial2026/japon.webp';
import jordan from '../assets/mundial2026/jordan.webp';
import marruecos from '../assets/mundial2026/marruecos.webp';
import mexico from '../assets/mundial2026/mexico.webp';
import noruega from '../assets/mundial2026/noruega.webp';
import nuevazelanda from '../assets/mundial2026/nuevazelanda.webp';
import paisesbajos from '../assets/mundial2026/paisesbajos.webp';
import panama from '../assets/mundial2026/panama.webp';
import paraguay from '../assets/mundial2026/paraguay.webp';
import portugal from '../assets/mundial2026/portugal.webp';
import qatar from '../assets/mundial2026/qatar.webp';
import republicacheca from '../assets/mundial2026/republicacheca.webp';
import senegal from '../assets/mundial2026/senegal.webp';
import sudafrica from '../assets/mundial2026/sudafrica.webp';
import suecia from '../assets/mundial2026/suecia.webp';
import suiza from '../assets/mundial2026/suiza.webp';
import tunez from '../assets/mundial2026/tunez.webp';
import turquia from '../assets/mundial2026/turquia.webp';
import uruguay from '../assets/mundial2026/uruguay.webp';
import usa from '../assets/mundial2026/usa.webp';
import uzbekistan from '../assets/mundial2026/uzbekistan.webp';

export { mundialLogo };

export const countryImages = {
  GER: alemania,
  KSA: arabiasaudita,
  ALG: argelia,
  ARG: argentina,
  AUS: australia,
  AUT: austria,
  BEL: belgica,
  BIH: bosnia,
  BRA: brasil,
  CPV: caboVerde,
  CAN: canada,
  COL: colombia,
  COD: congo,
  KOR: coreadelsur,
  CIV: costaDeMarfil,
  CRO: croacia,
  CUW: curazao,
  ECU: ecuador,
  EGY: egipto,
  SCO: escocia,
  ESP: espana,
  FRA: francia,
  GHA: ghana,
  HAI: haiti,
  ENG: inglaterra,
  IRQ: irak,
  IRN: iran,
  JPN: japon,
  JOR: jordan,
  MAR: marruecos,
  MEX: mexico,
  NOR: noruega,
  NZL: nuevazelanda,
  NED: paisesbajos,
  PAN: panama,
  PAR: paraguay,
  POR: portugal,
  QAT: qatar,
  CZE: republicacheca,
  SEN: senegal,
  RSA: sudafrica,
  SWE: suecia,
  SUI: suiza,
  TUN: tunez,
  TUR: turquia,
  URU: uruguay,
  USA: usa,
  UZB: uzbekistan,
  PANINI: mundialLogo,
  FWC: mundialLogo,
};

export function getCountryImage(code) {
  return countryImages[code] ?? mundialLogo;
}
