export const defaultOpening = {
  center: false,
  episode: 'Episode VIII',
  intro: 'A long time ago in a galaxy far,\nfar away....',
  logo: 'Star\nwars',
  text: "The FIRST ORDER reigns. Having decimated the peaceful Republic, Supreme Leader Snoke now deploys his merciless legions to seize military control of the galaxy.\nOnly General Leia Organa's band of RESISTANCE fighters stand against the rising tyranny, certain that Jedi Master Luke Skywalker will return and restore a spark of hope to the fight.\nBut the Resistance has been exposed. As the First Order speeds toward the rebel base, the brave heroes mount a desperate escape....",
  title: 'THE LAST JEDI',
};

export const defaultKey = 'Episode8';

export const firebases = {
  initial: process.env.FIREBASE_INITIAL,
  A: process.env.FIREBASE_A,
  B: process.env.FIREBASE_B,
};

export const defaultFirebase = firebases.B;
export const defaultFirebasePrefix = 'B';

export const serverApi = process.env.SERVER_API;

// MOCK Api
// export const serverApi = 'https://5mitidksxm7xfn4g4-mock.stoplight-proxy.io/';
