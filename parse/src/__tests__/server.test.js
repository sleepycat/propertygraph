const request = require('supertest')
const { server } = require('../server')

describe('parse server', () => {
  describe('/', () => {
    it('handles a post request', async () => {
      const response = await request(server)
        .post('/')
        .field('html', '<div dir="ltr">test content</div>\n')
        .field('to', 'ccc364@propertygraph.ca')
        .field('dkim', '{@korora-ca.20150623.gappssmtp.com : pass}')
        .field('text', 'test content\n')
        .field('SPF', 'none')
        .field('from', 'Mike Williamson <mike@korora.ca>')
        .field(
          'envelope',
          '{"to":["ccc364@propertygraph.ca"],"from":"mike@korora.ca"}',
        )
        .field('subject', 'test subject')
        .field(
          'charsets',
          '{"to":"UTF-8","html":"UTF-8","subject":"UTF-8","from":"UTF-8","text":"UTF-8"}',
        )
        .field('attachments', '0')
        .field('sender_ip', '209.85.166.179')
        .field(
          'headers',
          'Received: by mx0047p1mdw1.sendgrid.net with SMTP id 43Om0z95zX Wed, 01 May 2019 00:09:04 +0000 (UTC)\nReceived: from mail-it1-f179.google.com (mail-it1-f179.google.com [209.85.166.179]) by mx0047p1mdw1.sendgrid.net (Postfix) with ESMTPS id F019EA80F5A for <ccc364@propertygraph.ca>; Wed,  1 May 2019 00:09:03 +0000 (UTC)\nReceived: by mail-it1-f179.google.com with SMTP id q14so7775850itk.0 for <ccc364@propertygraph.ca>; Tue, 30 Apr 2019 17:09:03 -0700 (PDT)\nDKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=korora-ca.20150623.gappssmtp.com; s=20150623; h=mime-version:from:date:message-id:subject:to; bh=cesrHda9ko8JKnqRuNZghXCQBMoDwySe9qBKH9aSLfs=; b=k3I7gmbDbHbJz2OK3nkeMYcMcIfpEZe6Y4bxJMqqVBVOC0Auy3BoSR8QnsJwTEDxlV ptbOaumaQQtGfh7SSZTor/Bn3Kjg8Itl33D27n3NEfffGdRgztWhnMtBJK1gme5BXSPi xEMlTUc7twDm+q5y47xXf+0rRJPKl3KDAWEXMMgTui6qLE0K62/O8NZBqlxO0fMn1F3e qWrxgYc2pBneXas4Kw8fkm7/C3hVznGmZKoItHTN3cpSG5fRccaQSvc+jmBJf6TKQNnF PvP/wUm1eM0DCViXGRedNMaBGKWacqzvNZ7i6i0FQTzHK2e/HMi84GVEja5xEapwNbSD Bz9g==\nX-Google-DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=1e100.net; s=20161025; h=x-gm-message-state:mime-version:from:date:message-id:subject:to; bh=cesrHda9ko8JKnqRuNZghXCQBMoDwySe9qBKH9aSLfs=; b=lwVDiFdcmb2OfgWNUxV1SSQSPfXNTXiwgI/E9zVLh8vhTv6DOy77l6+kpb/wb/T+ak IiQcPWQBr+Q5cTCLhJwdfHcBmnxQ1aqtrSAkadjFuKT5TnhRcN+sP5qpHLgTf5mm40sK Fgcj67+Rlb/tu7/U0HEFRiGugIOR2J+li7qrKmYMsFWt9VV7Qk+NzIo0rm4hKZht2Imm 7jCyulS3uJazmjQWgQG2AZDK4LmHwv7JOno+lpBCHEdUbLdwc3wmiTh6nrF8kQbIukZg Hc1aMeIwkUNiin0cylBYwCIzLpa6xEcqGa8VpfrRae8dM1QeWf4RnYWYKdeH8BMlgkAh 6D7g==\nX-Gm-Message-State: APjAAAVV02lGOZ/ipanlDrH4gePEjSG1rEVBSO9LgAO90FQBenRFfRJA pECxEYlrw7jVFWv+/YSWabudFBo9qYDjDW40x84XBFecKFY=\nX-Google-Smtp-Source: APXvYqxa48QhrlyrppyYvdNRG5N5M+GcBHJfvAW/lPIHUNdJmDxMbgAG6/HT5AqG5CbBXc24KRm1g+TPtnCZ6HIYfws=\nX-Received: by 2002:a24:3201:: with SMTP id j1mr6460064ita.107.1556669343423; Tue, 30 Apr 2019 17:09:03 -0700 (PDT)\nMIME-Version: 1.0\nFrom: Mike Williamson <mike@korora.ca>\nDate: Tue, 30 Apr 2019 20:08:52 -0400\nMessage-ID: <CALXCH4OJ8VkvoonWyZTf4DAS6dkVSyoZT+eMh7C_xkmWrwHz-Q@mail.gmail.com>\nSubject: test subject\nTo: ccc364@propertygraph.ca\nContent-Type: multipart/alternative; boundary="0000000000003f77270587c85356"\n',
        )

      expect(response.body).toEqual({ ok: 'yes' })
    })
  })
})
