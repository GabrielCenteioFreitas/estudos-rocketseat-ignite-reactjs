// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from '@prismicio/client';

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

type PostDocumentDataSlicesSlice = PostSlice;

/**
 * Content for post documents
 */
interface PostDocumentData {
  /**
   * Slice Zone field in *post*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: post.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<PostDocumentDataSlicesSlice> /**
   * Meta Description field in *post*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: post.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *post*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: post.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *post*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: post.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * post document from Prismic
 *
 * - **API ID**: `post`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PostDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<PostDocumentData>, 'post', Lang>;

export type AllDocumentTypes = PostDocument;

/**
 * Primary content in *Post → Primary*
 */
export interface PostSliceDefaultPrimary {
  /**
   * title field in *Post → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: post.primary.title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * subtitle field in *Post → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: post.primary.subtitle
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  subtitle: prismic.KeyTextField;

  /**
   * author field in *Post → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: post.primary.author
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  author: prismic.KeyTextField;

  /**
   * banner field in *Post → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: post.primary.banner
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  banner: prismic.ImageField<never>;
}

/**
 * Primary content in *Post → Items*
 */
export interface PostSliceDefaultItem {
  /**
   * heading field in *Post → Items*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: post.items[].heading
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  heading: prismic.KeyTextField;

  /**
   * body field in *Post → Items*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: post.items[].body
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  body: prismic.RichTextField;
}

/**
 * Default variation for Post Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type PostSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<PostSliceDefaultPrimary>,
  Simplify<PostSliceDefaultItem>
>;

/**
 * Slice variation for *Post*
 */
type PostSliceVariation = PostSliceDefault;

/**
 * Post Shared Slice
 *
 * - **API ID**: `post`
 * - **Description**: Post
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type PostSlice = prismic.SharedSlice<'post', PostSliceVariation>;

declare module '@prismicio/client' {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      PostDocument,
      PostDocumentData,
      PostDocumentDataSlicesSlice,
      AllDocumentTypes,
      PostSlice,
      PostSliceDefaultPrimary,
      PostSliceDefaultItem,
      PostSliceVariation,
      PostSliceDefault,
    };
  }
}
