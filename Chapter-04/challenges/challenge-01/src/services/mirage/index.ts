import { Factory, Model, Response, createServer, ActiveModelSerializer } from 'miragejs'
import { faker, fakerEN_US } from '@faker-js/faker'

import { continentsInfos } from '../../../public/lib/staticContinentsInfos'

export type Continent = {
  name: string;
  slug: string;
  short_description: string;
  long_description: string;
  banner: string;
  countries: number;
  languages: number;
  cities_plus_100: number;
  cities: {
    name: string;
    country: string;
    country_code: string;
    photo: string;
  }[]
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
          return faker.lorem.paragraph()
        },
        banner(i: number) {
          return faker.image.urlLoremFlickr({ category: continentsInfos[i].slug })
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
        cities(i: number) {
          return Array.from({ length: 5 }).map(() => ({
            name: faker.location.city(),
            country: faker.location.country(),
            country_code: faker.location.countryCode(),
            photo: faker.image.urlLoremFlickr({ category: continentsInfos[i].slug }),
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

      this.get('/continents/:id');

      this.namespace = '';
      this.passthrough()
    }
  })

  return server;
}