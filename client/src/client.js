import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'unjl1a7s',
  dataset: 'production',
  apiVersion: '2022-08-18',
  useCdn: true,
  token: 'Your token',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);