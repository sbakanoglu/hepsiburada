Feature: Kullanıcı sisteme giriş

  Scenario: Kullanıcı sisteme giriş yapar.
    Given İlgili "https://www.hepsiburada.com" link açılır.
    Given Kullanıcı Giriş yap yazısının üzerine gelerek giriş yap linkine tıklar.
    Given Eposta "werap93332@zherben.com" yazıldıktan sonra giriş yap butona basılır.
    Given Şifre "Hepsi1234" yazıldıktan sonra giriş yap butona basılır.
    When Kullanıcı giriş yapmıştır.
    Then Çıkış yap.
