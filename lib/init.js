
export default async () => {
  const Parse = await import('parse');

  Parse.initialize('myAppId');
  Parse.serverURL = 'http://localhost:1337/parse';

  return Parse;
};

