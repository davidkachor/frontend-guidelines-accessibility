import { test } from '@playwright/test'
import { FeatureFlag } from '../../pages/feature-flag.page'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/example-flags')
})

test('Flag switcher should turn On and Off the Feature flag if clicking', async ({ page }) => {
  const featureFlagPage = new FeatureFlag(page)

  await featureFlagPage.assertTheFirstFlagDisabled()

  await featureFlagPage.clickTheFirstFF()

  await featureFlagPage.saveTheFeatureFlagValue()

  await featureFlagPage.assertTheFlagInLocalStorage()

  await featureFlagPage.clickTheLoginButton()

  await featureFlagPage.assertTheFFlagButtonVisible()

  await page.goto('http://localhost:5173/example-flags')

  await page.reload()

  await featureFlagPage.assertTheFlagInLocalStorage()

  await featureFlagPage.clickTheFirstFF()

  await featureFlagPage.assertTheFlagNotInStorage()

  await featureFlagPage.clickTheLoginButton()

  await featureFlagPage.assertFFlagButtonNotVisible()
})
