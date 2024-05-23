import { Factory, Model, Response, createServer, ActiveModelSerializer } from 'miragejs'
import { faker } from '@faker-js/faker'

import { continentsInfos } from '../../../public/lib/staticContinentsInfos'

export type City = {
  name: string;
  country: string;
  country_code: string;
  photo: string;
}

export type Continent = {
  name: string;
  slug: string;
  short_description: string;
  long_description: string;
  banner: string;
  countries: number;
  languages: number;
  cities_plus_100: number;
  cities: City[];
}

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer
    },

    models: {
      continent: Model.extend<Partial<Continent>>({})
    },

    factories: {
      continent: Factory.extend({
        name(i: number) {
          return continentsInfos[i].name
        },
        slug(i: number) {
          return continentsInfos[i].slug
        },
        short_description(i: number) {
          return continentsInfos[i].description
        },
        long_description() {
          return faker.lorem.paragraphs(2)
        },
        banner(i: number) {
          return faker.image.urlPicsumPhotos()
        },
        countries() {
          return faker.number.int({ min: 10, max: 99 })
        },
        languages() {
          return faker.number.int({ min: 10, max: 99 })
        },
        cities_plus_100() {
          return faker.number.int({ min: 10, max: 99 })
        },
        cities() {
          return Array.from({ length: Math.ceil(Math.random() * 6) + 4 }).map(() => ({
            name: faker.location.city(),
            country: faker.location.country(),
            country_code: faker.location.countryCode(),
            photo: faker.image.urlPicsumPhotos()
          }));
        }
      })
    },

    seeds(server) {
      server.createList('continent', continentsInfos.length)
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/continents', function (
        this: {
          serialize: (schema: any) => any 
        },
        schema: any
      ) {
        const continents = this.serialize(schema.all('continent')).continents

        return new Response(
          200,
          {},
          { continents }
        )
      });

      this.get('/continents/:slug', function (
        schema: any,
        request: any
      ) {
        const slug = request.params.slug;
        const continent = schema.continents.findBy({ slug });

        return continent
          ? new Response(200, {}, { continent })
          : new Response(404, {}, { error: 'Continent not found' });
      });

      this.namespace = '';
      this.passthrough();
    }
  })

  return server;
}