<?php

namespace Entities;
use Doctrine\ORM\Mapping as ORM;
#[ORM\Entity]
class Controle
{
    private int $controlID;
    private int $lessonID;
    private float $coef;

}