/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Swizzled to add flat SVG flags (LangFlags) to the locale dropdown:
 * the closed button shows the current locale's flag, and every row shows
 * the flag + native name + English name. Style follows Variant B from the
 * picker preview: rounded 4px chips, 32px flags in the menu.
 *
 * The three helpers below (`useAlternatePageUtils`, `mergeSearchStrings`,
 * `useLocation`) are inlined versions of `@docusaurus/theme-common`
 * internals, so this component keeps zero dependency on theme-common
 * (which is not a direct dependency of this package).
 */

import React, {type ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocation} from '@docusaurus/router';
import {translate} from '@docusaurus/Translate';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import {Flag, ENGLISH_NAMES} from '@site/src/components/LangFlags';
import type {LinkLikeNavbarItemProps} from '@theme/NavbarItem';
import type {Props} from '@theme/NavbarItem/LocaleDropdownNavbarItem';

import styles from './styles.module.css';

/** Inline of @docusaurus/theme-common's useAlternatePageUtils. */
function useAlternatePageUtils() {
  const {
    siteConfig: {baseUrl, trailingSlash},
    i18n: {localeConfigs},
  } = useDocusaurusContext();
  const {pathname} = useLocation();
  const canonicalPathname = trailingSlash
    ? pathname.endsWith('/')
      ? pathname
      : `${pathname}/`
    : pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname;
  const pathnameSuffix = canonicalPathname.replace(baseUrl, '');

  function getLocaleConfig(locale: string) {
    const localeConfig = localeConfigs[locale];
    if (!localeConfig) {
      throw new Error(
        `Unexpected Docusaurus bug, no locale config found for locale=${locale}`,
      );
    }
    return localeConfig;
  }

  function createUrl({
    locale,
    fullyQualified,
  }: {
    locale: string;
    fullyQualified: boolean;
  }) {
    const localeConfig = getLocaleConfig(locale);
    const newUrl = fullyQualified ? localeConfig.url : '';
    const newBaseUrl = localeConfig.baseUrl;
    return `${newUrl}${newBaseUrl}${pathnameSuffix}`;
  }
  return {createUrl};
}

/** Inline of @docusaurus/theme-common's mergeSearchStrings (append mode). */
function mergeSearchStrings(search1: string, search2: string) {
  const clean = (s: string) => s.replace(/^\?/, '');
  const a = clean(search1);
  const b = clean(search2);
  if (!a) return b ? `?${b}` : '';
  if (!b) return `?${a}`;
  return `?${a}&${b}`;
}

function useLocaleDropdownUtils() {
  const {siteConfig, i18n: {localeConfigs}} = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();
  const {search, hash} = useLocation();

  const getLocaleConfig = (locale: string) => {
    const localeConfig = localeConfigs[locale];
    if (!localeConfig) {
      throw new Error(
        `Docusaurus bug, no locale config found for locale=${locale}`,
      );
    }
    return localeConfig;
  };

  const getBaseURLForLocale = (locale: string) => {
    const localeConfig = getLocaleConfig(locale);
    const isSameDomain = localeConfig.url === siteConfig.url;
    if (isSameDomain) {
      // Shorter paths if localized sites are hosted on the same domain
      // This reduces HTML size a bit
      return `pathname://${alternatePageUtils.createUrl({
        locale,
        fullyQualified: false,
      })}`;
    }
    return alternatePageUtils.createUrl({
      locale,
      fullyQualified: true,
    });
  };

  return {
    getURL: (locale: string, options: {queryString: string | undefined}) => {
      // We have 2 query strings because
      // - there's the current one
      // - there's one user can provide through navbar config
      // see https://github.com/facebook/docusaurus/pull/8915
      const finalSearch = options.queryString
        ? mergeSearchStrings(search, options.queryString)
        : search;
      return `${getBaseURLForLocale(locale)}${finalSearch}${hash}`;
    },
    getLabel: (locale: string) => {
      return getLocaleConfig(locale).label;
    },
    getLang: (locale: string) => {
      return getLocaleConfig(locale).htmlLang;
    },
  };
}

export default function LocaleDropdownNavbarItem({
  mobile,
  dropdownItemsBefore,
  dropdownItemsAfter,
  queryString,
  ...props
}: Props): ReactNode {
  const utils = useLocaleDropdownUtils();

  const {
    i18n: {currentLocale, locales},
  } = useDocusaurusContext();
  const localeItems = locales.map((locale): LinkLikeNavbarItemProps => {
    return {
      label: (
        <span className={styles.langItem}>
          <Flag locale={locale} size="md" />
          <span className={styles.langNative}>{utils.getLabel(locale)}</span>
          {ENGLISH_NAMES[locale] && (
            <span className={styles.langEn}>{ENGLISH_NAMES[locale]}</span>
          )}
        </span>
      ),
      lang: utils.getLang(locale),
      to: utils.getURL(locale, {queryString}),
      target: '_self',
      autoAddBaseUrl: false,
      className:
        // eslint-disable-next-line no-nested-ternary
        locale === currentLocale
          ? // Similar idea as DefaultNavbarItem: select the right Infima active
            // class name. This cannot be substituted with isActive, because the
            // target URLs contain `pathname://` and therefore are not NavLinks!
            mobile
            ? 'menu__link--active'
            : 'dropdown__link--active'
          : '',
    };
  });

  const items = [...dropdownItemsBefore, ...localeItems, ...dropdownItemsAfter];

  // Mobile is handled a bit differently
  const dropdownLabel = mobile
    ? translate({
        message: 'Languages',
        id: 'theme.navbar.mobileLanguageDropdown.label',
        description: 'The label for the mobile language switcher dropdown',
      })
    : utils.getLabel(currentLocale);

  return (
    <DropdownNavbarItem
      {...props}
      mobile={mobile}
      label={
        <>
          <Flag locale={currentLocale} size="sm" />
          <span className={styles.langBtnLabel}>{dropdownLabel}</span>
        </>
      }
      items={items}
    />
  );
}
