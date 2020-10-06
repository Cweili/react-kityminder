import './coverage'

it('should modify text on mindmap', async () => {
  await expect(page).toClick('#minder_node2')
  await page.keyboard.type('Hello')
  await page.keyboard.press('Enter')
})

it('should modify text on mindmap when click outside', async () => {
  await expect(page).toClick('#minder_node2')
  await page.keyboard.press('NumpadAdd')
  await expect(page).toClick('div[style="position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px;"]')
})

it('should cancel modify text on mindmap when press "Escape"', async () => {
  await expect(page).toClick('#minder_node2')
  await page.keyboard.press('0')
  await page.keyboard.press('Escape')
  await expect(page).toClick('#minder_node2')
  await page.keyboard.press('NumpadAdd')
  await page.keyboard.press('Escape')
})

it('should not modify text on mindmap when press "Alt"', async () => {
  await expect(page).toClick('#minder_node2')
  await page.keyboard.press('AltLeft')
})
