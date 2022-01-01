Feature: Ürünleri sepete ekleme

  Scenario: Kullanıcı sisteme giriş yapar ürünleri sepete ekler
    Given İlgili "https://www.hepsiburada.com" link açılır.
    Given Kullanıcı Giriş yap yazısının üzerine gelerek giriş yap linkine tıklar.
    Given Eposta "werap93332@zherben.com" yazıldıktan sonra giriş yap butona basılır.
    Given Şifre "Hepsi1234" yazıldıktan sonra giriş yap butona basılır.
    When Kullanıcı giriş yapmıştır.
    When "Kalem" ürün arama yerine yazılarak ara butonuna basılır.
    When Ürün listesinden rastgele bir tane ürün seçilir.
    When Ürün detay sayfasında sepete ekle butonuna basarız.
    When Diğer 2 satıcıdan aynı ürün sepete eklenir.
    Then Çıkış yap.

  Scenario: Kullanıcı girişi yapılmadan belirtilen ürünü sepete ekleme
    Given İlgili "https://www.hepsiburada.com" link açılır.
    When Menüden "Kitap, Müzik, Film, Hobi > Uzaktan Kumandalı Araçlar" linkine tıklar.
    When Ürün listesinden rastgele bir tane ürün seçilir.
    When Ürün detay sayfasında sepete ekle butonuna basarız.